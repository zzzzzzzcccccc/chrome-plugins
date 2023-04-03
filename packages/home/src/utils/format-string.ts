function toLocaleLowerCase(target = '') {
  return target.toLocaleLowerCase();
}

function toSymbol(target = '', result = '_') {
  return target.replace(/\W/gi, result);
}

const formatString = {
  toLocaleLowerCase,
  toSymbol,
};

export default formatString;
