import { h } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props) {
    console.log(props);
  },
  render() {
    return h("p", {}, "foo: " + this.count);
  },
};