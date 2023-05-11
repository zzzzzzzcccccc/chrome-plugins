const formatFileSize = (size: number | string | bigint = 0) => {
  const current = Number(size);
  if (isNaN(current) || current < 0) {
    return '0KB';
  }
  if (current < 1024) {
    return `${current}B`;
  }
  if (current < 1024 ** 2) {
    return `${Math.round((current / 1024) * 100) / 100}KB`;
  }
  if (current < 1024 ** 3) {
    return `${Math.round((current / 1024 ** 2) * 100) / 100}MB`;
  }
  return `${Math.round((current / 1024 ** 3) * 100) / 100}GB`;
};

export default formatFileSize;
