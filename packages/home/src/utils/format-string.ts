function toLocaleLowerCase(target = '') {
  return target.toLocaleLowerCase();
}

function toSymbol(target = '', result = '_') {
  return target.replace(/\W/gi, result);
}

function toSplitContentType(target = '') {
  try {
    return target.split('/')[0];
  } catch (e) {
    return '';
  }
}

const formatString = {
  toLocaleLowerCase,
  toSymbol,
  toSplitContentType,
};

export default formatString;
