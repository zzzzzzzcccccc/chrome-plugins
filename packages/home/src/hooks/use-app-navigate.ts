import { useNavigate, NavigateOptions } from 'react-router-dom';

export default function useAppNavigate() {
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const toJsonEditor = (options?: NavigateOptions) => navigate('/json-editor', options);

  const toStringEditor = (options?: NavigateOptions) => navigate('/string-editor', options);

  const toBase64Editor = (options?: NavigateOptions) => navigate('/base64-editor', options);

  const toHTMLToJSXEditor = (options?: NavigateOptions) => navigate('/html-to-jsx-editor', options);

  const toMD5Editor = (options?: NavigateOptions) => navigate('/md5-editor', options);

  const toAESEditor = (options?: NavigateOptions) => navigate('/aes-editor', options);

  const toSHAEditor = (options?: NavigateOptions) => navigate('/sha-editor', options);

  const toRabbitEditor = (options?: NavigateOptions) => navigate('/rabbit-editor', options);

  const toReadFile = (options?: NavigateOptions) => navigate('/read-file', options);

  return {
    navigate,
    back,
    toJsonEditor,
    toStringEditor,
    toBase64Editor,
    toHTMLToJSXEditor,
    toMD5Editor,
    toAESEditor,
    toSHAEditor,
    toRabbitEditor,
    toReadFile,
  };
}
