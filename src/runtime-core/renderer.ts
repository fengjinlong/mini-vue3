import { createComponentInstance } from "./component";
import { setupComponent } from "./createApp";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  processComponent(vnode, container);
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  // 调用render
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();
  patch(subTree, container);
}
