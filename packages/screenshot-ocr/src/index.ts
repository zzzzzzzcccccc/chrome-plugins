function hello<T = string>(target: T) {
  console.log(`the target = ${target}`);
  return target;
}

hello(21321);

export default hello;
