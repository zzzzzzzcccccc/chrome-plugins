import { useNavigate, NavigateOptions } from 'react-router-dom';
import { AppItem } from '../store/slices/menu-slice';
import { createLink } from '../utils';

export default function useAppNavigate() {
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const appJump = (url: string, jumpMethod: AppItem['jumpMethod'] = 'internal', options?: NavigateOptions) => {
    if (jumpMethod === 'internal') {
      navigate(url, options);
    } else {
      const link = createLink(url);
      link.click();
      link.remove();
    }
  };

  return {
    navigate,
    back,
    appJump,
  };
}
