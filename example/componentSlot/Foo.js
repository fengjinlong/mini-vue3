import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props, { emit }) {
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    console.log(this.$slots);
    const age = 18
    return h("p", {}, [
      renderSlots(this.$slots, "header", { age}),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
