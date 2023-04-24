import { useNavigate } from 'react-router-dom';

export default function useAppNavigate() {
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const toSetting = () => navigate('/setting');

  const toJsonEditor = () => navigate('/json-editor');

  const toStringEditor = () => navigate('/string-editor');

  const toBase64Editor = () => navigate('/base64-editor');

  const toHTMLToJSXEditor = () => navigate('/html-to-jsx-editor');

  return {
    back,
    toSetting,
    toJsonEditor,
    toStringEditor,
    toBase64Editor,
    toHTMLToJSXEditor,
    navigate,
  };
}