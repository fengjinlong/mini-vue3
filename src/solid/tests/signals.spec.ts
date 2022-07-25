import { createMemo, createRoot, createSignal } from "..";

describe("create signals", () => {
  test("happy path", () => {
    const [value, options] = createSignal(5);
    expect(value(null)).toBe(5);
  });
  test("Create and read a Signal with comparator", () => {
    const [value] = createSignal(5, { equals: (a: any, b: any) => a === b });
    expect(value(null)).toBe(5);
  });
  test("Create and read a Memo", () => {
    createRoot(() => {
      const memo = createMemo(() => "Hello");
      expect(memo()).toBe("Hello");
    });
  });
});
