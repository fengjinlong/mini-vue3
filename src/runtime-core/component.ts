import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandler } from "./componentPublicInstance";
export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {},
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}
export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  // initSlots
  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance: any) {
  const Component = instance.vnode.type;
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandler);
  const { setup } = Component;
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    });
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  // function ----- 组件的render
  // object ----- 把object 注入组件的上下文中
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  // 保证组件存在render
  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
