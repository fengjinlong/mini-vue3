const equalFn = (a, b) => a === b;
const signalOptions = { equals: equalFn };
export function createSignal(value, options?) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  let s = {
    value,
    observers: null,
    observerSlots: null,
    // pending: NOTPENDING,
    comparator: options.equals || undefined,
  };
  const setter = (value) => {
    if (typeof value === "function") {
      value();
    }
    return writeSignal(s, value);
  };
  return [readSignal.bind(s), setter];
}

// readSignal 1178
// writeSignal 1214
export function writeSignal(node, value) {
  return value;
}
export function readSignal(this: any) {
  return this.value;
}
export function createRoot(fn) {
  const listener = null
  try {
    return runUpdates(updateFn, true)!;
  } finally {
    // Listener = listener;
  }

}
export function createMemo(fn) {}
