function hello<T = string>(target: T) {
  console.log(`the targt = ${target}`);
  return target;
}

hello(21321);

export default hello;
