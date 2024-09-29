import axios from 'axios';

export async function downloadByUrl(url: string, fileName: string) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'blob',
  });
  if (response.data) {
    const blobURL = URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobURL);
  }
}
