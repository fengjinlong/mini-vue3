import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
window.self = null;
export const App = {
  render() {
    window.self = this;
    return h("div", {}, [
      h("p", { class: "p" }, "App"),
      h(Foo, {
        onAdd(a,b) {
          console.log("接受到 add 并执行 onAdd",a,b);
        },
      }),
    ]);
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
