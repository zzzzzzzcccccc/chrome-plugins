export default function getPlatform() {
  const platform = (navigator?.userAgent || '').toLocaleLowerCase();
  if (platform.indexOf('win') !== -1) {
    return 'window';
  }
  if (platform.indexOf('mac') !== -1) {
    return 'mac';
  }
  if (platform.indexOf('linux') !== -1) {
    return 'linux';
  }
  return 'unknown';
}
