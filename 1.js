function fun() {
  const obj = {};
  return function () {
    obj.a = 1;
    obj.a = 2;
  };
}
