import { hasChange, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  public __v_isRef = true;
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // if (Object.is(newValue, this._value)) return;
    if (hasChange(newValue, this._value)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}
export function isRef(ref) {
  return !!ref.__v_isRef;
}
export function unRef(value) {
  return isRef(value) ? value.value : value;
}
export function proxyRefs(objWithRef) {
  return new Proxy(objWithRef, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return (target[key] = value);
      }
    },
  });
}
