class ReactiveEffect {
  private _fn: any;
  constructor(fn: any) {
    this._fn = fn;
  }
  run() {
    activeEffect = this
    this._fn();
  }
}
const targetMap = new Map();
let activeEffect;
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key);
  if(!dep){
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
export function trigger(target, key){

}
export function effect(fn: any) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}