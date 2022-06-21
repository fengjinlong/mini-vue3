import { h, provide, inject } from "../../lib/guide-mini-vue.esm.js";
const Provider = {
  name: "provider",
  setup() {
    provide("foo", "fooval");
    provide("bar", "barval");
  },
  render() {
    return h("div", {}, [h("p", {}, "provider"), h(ProviderTwo)]);
  },
};
const ProviderTwo = {
  name: "provider",
  setup() {
    provide("foo", "fooTwoval");
    const fooTwo = inject("foo");
    return {
      fooTwo,
    };
  },
  render() {
    return h("div", {}, [
      h("p", {}, "providerTwo:" + this.fooTwo),
      h(Consumer),
    ]);
  },
};
const Consumer = {
  name: "consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    // const baz = inject("baz", "baz");
    const baz = inject("baz", () => "baz");
    return {
      foo,
      bar,
      baz,
    };
  },
  render() {
    return h("div", {}, `Consumer: ${this.foo} - ${this.bar} - ${this.baz}`);
  },
};
export const App = {
  render() {
    return h("div", {}, [h("p", {}, "apiInject"), h(Provider)]);
  },
  setup() {
    return {};
  },
};
