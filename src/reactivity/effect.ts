import { extend } from "../shared";

class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  constructor(fn: any, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}
const targetMap = new Map();
let activeEffect;
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (!activeEffect) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
export function effect(fn: any, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();
  // _effect.onStop = options.onStop;
  // Object.assign(_effect, optionU)
  extend(_effect, options);
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
export function stop(runner: any) {
  runner.effect.stop();
}
