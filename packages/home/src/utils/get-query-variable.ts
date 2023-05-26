export default function getQueryVariable<T = string>(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) {
      return decodeURIComponent(pair[1] || '') as T;
    }
  }
  return '';
}
