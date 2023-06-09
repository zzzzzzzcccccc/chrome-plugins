export function validateURL(url: string) {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
}

export function parseURL(url: string) {
  const parsedURL = validateURL(url);

  if (!parsedURL) {
    return null;
  }

  const protocol = parsedURL.protocol;
  const domain = parsedURL.hostname;

  const params = new URLSearchParams(parsedURL.search);
  const queryParams: { key: string; value: string }[] = [];
  params.forEach((value, key) => {
    queryParams.push({ key, value });
  });

  return {
    protocol,
    domain,
    queryParams,
  };
}
