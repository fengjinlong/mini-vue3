import { h, ref } from "../../lib/guide-mini-vue.esm.js";
import Child from "./Child.js";
export const App = {
  name: "App",
  setup() {
    const msg = ref(111);
    const count = ref(555);
    window.msg = msg;
    const changeChildProps = () => {
      msg.value = 111222;
    };
    const changeCount = () => {
      count.value = 555666;
    };
    return {
      msg,
      changeCount,
      changeChildProps,
      count,
    };
  },
  render() {
    return h("p", {}, [
      h("button", { onClick: this.changeChildProps }, "changeChildProps"),
      h(Child, { msg: this.msg }),
      h("button", { onClick: this.changeCount }, "change self count"),
      h("p", {}, "count: " + this.count),
    ]);
  },
};
