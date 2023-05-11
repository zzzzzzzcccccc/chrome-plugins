import { useNavigate } from 'react-router-dom';

export default function useAppNavigate() {
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const toJsonEditor = () => navigate('/json-editor');

  const toStringEditor = () => navigate('/string-editor');

  const toBase64Editor = () => navigate('/base64-editor');

  const toHTMLToJSXEditor = () => navigate('/html-to-jsx-editor');

  const toMD5Editor = () => navigate('/md5-editor');

  const toAESEditor = () => navigate('/aes-editor');

  const toSHAEditor = () => navigate('/sha-editor');

  const toRabbitEditor = () => navigate('/rabbit-editor');

  const toReadFile = () => navigate('/read-file');

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
