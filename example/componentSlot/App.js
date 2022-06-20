import { h,createTextVNode } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
export const App = {
  render() {
    return h("div", {}, [
      h("p", { class: "p" }, "App"),
      // array
      // h(Foo, {}, [
      //   h("p", {}, "foo-child-slots"),
      //   h("p", {}, "foo-child-slots2"),
      // ]),
      // one
      // h(Foo, {}, h("p", {}, "foo-child-slots2")),
      // object key
      h(
        Foo,
        {},
        {
          header: ({ age }) => [
            h("p", {}, "header" + age),
            createTextVNode("你好呀"),
          ],
          footer: () => h("p", {}, "footer"),
        }
      ),
    ]);
  },
  setup() {
    return {};
  },
};
