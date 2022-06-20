import { h, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    console.log("foo", instance);
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    return h("p", {}, [foo]);
  },
};
