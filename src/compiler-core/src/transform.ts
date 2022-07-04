import { NodeTypes } from "./ast";

export function transform(root, options = {}) {
  // <div>hi,{{message}}</div>
  // console.log(root)
  // {
  //   children: [
  //     {
  //       type: 2,
  //       tag: 'div',
  //       children: [
  //         {},
  //         {}
  //       ]
  //     }
  //   ]
  // }
  const context = createTransformContext(root, options);
  // 插件
  traverseNode(root, context);
  // 挂载 codegen
  createRootCodegen(root);
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0];
}

function createTransformContext(root: any, options: any) {
  const context = { root, nodeTransforms: options.nodeTransforms || [] };
  return context;
}
function traverseNode(node: any, context) {
  const nodeTransforms = context.nodeTransforms;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node);
  }
  traverseChildren(node, context);
}
function traverseChildren(node: any, context: any) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
