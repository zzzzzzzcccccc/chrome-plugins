import { useCallback } from 'react';
import { useNavigate, NavigateOptions, useLocation } from 'react-router-dom';
import { AppItem } from '../store/slices/menu-slice';
import { createLink } from '../utils';

export default function useAppNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const back = useCallback(() => navigate(-1), [navigate]);

  const appJump = useCallback(
    (url: string, jumpMethod: AppItem['jumpMethod'] = 'internal', options?: NavigateOptions) => {
      if (jumpMethod === 'internal') {
        navigate(url, options);
      } else {
        const link = createLink(url);
        link.click();
        link.remove();
      }
    },
    [navigate],
  );

  return {
    navigate,
    location,
    back,
    appJump,
  };
}
