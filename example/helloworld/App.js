import { h } from "../../lib/guide-mini-vue.esm.js";
window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "heard"],
      },
      // 代理对象
      "hi, " + this.msg
      // string
      // "hi, minivue"
      // [
      //   // array
      //   h("p", { class: "p" }, "p"), h("p", { class: "p2" }, "p2")
      // ]
    );
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
