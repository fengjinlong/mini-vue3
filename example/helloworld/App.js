import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "heard"],
        onClick() {
          console.log("click ");
        },
      },
      // 代理对象
      // "hi, " + this.msg
      // string
      // "hi, minivue"
      // array
      // [
      //   h("p", { class: "p" }, "p"), h("p", { class: "p2" }, "p2")
      // ]
      // props
      [h("p", { class: "p" }, "p"), h(Foo), { count: 1 }]
    );
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
