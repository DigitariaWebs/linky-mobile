// Noop analytics stubs for V1 — swap with real provider in V2.
type Props = Record<string, string | number | boolean | null | undefined>;

export function track(_event: string, _props?: Props) {
  if (__DEV__) {
    // console.log('[track]', _event, _props);
  }
}

export function identify(_userId: string, _traits?: Props) {}

export function screen(_name: string, _props?: Props) {}
