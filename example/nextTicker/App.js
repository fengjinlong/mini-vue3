import { h, ref } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  name: "App",
  setup() {
    const count = ref(1);
    function onClick() {
      for (let i = 0; i < 100; i++) {
        count.value = i;
      }
    }
    
    return {
      count,
      onClick,
    };
  },
  render() {
    const btn = h("button", { onClick: this.onClick }, "update");
    const p = h("p", {}, "count: " + this.count);
    return h("div", {}, [btn, p]);
  },
};
