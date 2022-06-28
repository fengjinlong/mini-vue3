import { h } from "../../lib/guide-mini-vue.esm.js";
export default {
  name: "Child",
  setup(props, { emit }) {},
  render() {
    return h("p", {}, [h("p", {}, "child-props-msg: " + this.$props.msg)]);
  },
};
