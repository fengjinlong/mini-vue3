import { NodeTypes } from "./ast";
import { helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers";

export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;

  genFuntionPreamble(ast, context);

  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(", ");
  push(`function ${functionName}(${signature}){`);
  push("return ");
  genNode(ast.codegenNode, context);
  push("}");
  return {
    code: context.code,
  };
}

function genFuntionPreamble(ast, context) {
  const { push } = context;
  const VueBinging = "Vue";
  if (ast.helpers.length > 0) {
    const aliasHelper = (s) => `${helperMapName[s]}:_${helperMapName[s]}`;
    push(`const {${ast.helpers.map(aliasHelper).join(", ")}} = ${VueBinging}`);
  }
  push("\n");
  push("return ");
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
    helper(key) {
      return `_${helperMapName[key]}`;
    },
  };
  return context;
}

function genNode(node: any, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;
    default:
      break;
  }
}

function genExpression(node, context) {
  // Implement
  const { push } = context;

  push(`${node.content}`);
}

function genInterpolation(node, context) {
  // Implement
  const { helper, push } = context;
  // push(`_toDisplayString(`);
  push(helper(TO_DISPLAY_STRING));
  push("(");

  genNode(node.content, context);
  push(")");
}

function genText(node, context: any) {
  const { push } = context;
  push(` '${node.content}'`);
}
