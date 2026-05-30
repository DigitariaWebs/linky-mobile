-- Block E.2.fix — toggle_product_favorite's OUT parameter `fav_count` collided with
-- the column public.products.fav_count inside the UPDATE statements, producing
-- "column reference \"fav_count\" is ambiguous" on every call. Alias the table as `p`
-- and qualify column references so the OUT parameter stays unambiguous.

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
  v_existed   boolean;
  v_count     int;
  v_favorited boolean;
begin
  perform 1 from public.products where id = p_product_id for update;

  select exists (
    select 1 from public.product_favorites
    where user_id = p_user_id and product_id = p_product_id
  ) into v_existed;

  if v_existed then
    delete from public.product_favorites
      where user_id = p_user_id and product_id = p_product_id;
    update public.products as p set fav_count = greatest(p.fav_count - 1, 0)
      where p.id = p_product_id
      returning p.fav_count into v_count;
    v_favorited := false;
  else
    insert into public.product_favorites (user_id, product_id)
      values (p_user_id, p_product_id);
    update public.products as p set fav_count = p.fav_count + 1
      where p.id = p_product_id
      returning p.fav_count into v_count;
    v_favorited := true;
  end if;

  favorited := v_favorited;
  fav_count := coalesce(v_count, 0);
  return next;
end;
$$;
