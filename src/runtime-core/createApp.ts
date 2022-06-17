import { PublicInstanceProxyHandler } from "./componentPublicInstance";
import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent);
      render(vnode, rootContainer);
    },
  };
}
export function setupComponent(instance) {
  // initprops
  // initSlots
  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance: any) {
  const Component = instance.vnode.type;
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandler);
  const { setup } = Component;
  if (setup) {
    const setupResult = setup();
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
