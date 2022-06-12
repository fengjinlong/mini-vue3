import { createGetter, mutableHandlers, readonlyHandlers } from "./baseHanders";
import { track, trigger } from "./effect";
export function reactive(raw: any) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return createActiveObject(raw, readonlyHandlers);
}
function createActiveObject(raw: any, baseHanders) {
  return new Proxy(raw, baseHanders);
}
