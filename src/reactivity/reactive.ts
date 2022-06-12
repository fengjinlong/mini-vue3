import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHanders";
export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}
export function reactive(raw: any) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return createActiveObject(raw, readonlyHandlers);
}
function createActiveObject(raw: any, baseHanders) {
  return new Proxy(raw, baseHanders);
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}
export function shallowReadonly(raw: any) {
  return createActiveObject(raw, shallowReadonlyHandlers);
}
export function isProxy(value){
  return isReadonly(value) || isReactive(value)
}
