-- Block E.2 — Favorite toggle. Wraps the insert/delete + fav_count adjustment in one tx so
-- a double-tap or two devices for the same user can't drift fav_count off the row count.
-- Returns the new favorited state and the new fav_count so the client can update without refetch.

create or replace function public.toggle_product_favorite(
  p_user_id    uuid,
  p_product_id uuid
)
returns table (favorited boolean, fav_count int)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_existed boolean;
  v_count   int;
begin
  -- Lock the product row to serialize the read-and-update with other toggles for the same product.
  perform 1 from public.products where id = p_product_id for update;

  select exists (
    select 1 from public.product_favorites
    where user_id = p_user_id and product_id = p_product_id
  ) into v_existed;

  if v_existed then
    delete from public.product_favorites
      where user_id = p_user_id and product_id = p_product_id;
    update public.products set fav_count = greatest(fav_count - 1, 0)
      where id = p_product_id
      returning fav_count into v_count;
    favorited := false;
  else
    insert into public.product_favorites (user_id, product_id)
      values (p_user_id, p_product_id);
    update public.products set fav_count = fav_count + 1
      where id = p_product_id
      returning fav_count into v_count;
    favorited := true;
  end if;

  fav_count := coalesce(v_count, 0);
  return next;
end;
$$;

revoke all on function public.toggle_product_favorite(uuid, uuid) from public, anon, authenticated;
grant execute on function public.toggle_product_favorite(uuid, uuid) to service_role;
