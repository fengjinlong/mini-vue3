import { h } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props, { emit }) {
    const emitAdd = () => {
      console.log("派发 add")
      emit("add",1,2);
    };
    return {
      emitAdd,
    };
  },
  render() {
    const btn = h("button", { onClick: this.emitAdd }, "emitAdd");
    const foo = h("p", {}, "foo");
    return h("p", {}, [foo, btn]);
  },
};
