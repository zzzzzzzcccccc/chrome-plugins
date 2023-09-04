export function createLink(url: string, target = '_blank') {
  const link = document.createElement('a');
  link.href = url;
  link.target = target;
  return link;
}

export function createDownloadLink(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  return link;
}
