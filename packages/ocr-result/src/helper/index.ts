export type ImageMetaData = { width: number; height: number; base64: string; target: string };

export const getSourceData = () => {
  const sourceDom = document.getElementById('source-message') as HTMLTextAreaElement;
  if (!sourceDom || !sourceDom.value) {
    return null;
  }
  return JSON.parse(sourceDom.value) as ImageMetaData;
};
