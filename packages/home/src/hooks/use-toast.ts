import { useStoreDispatch } from './use-store';
import { showToast, closeToast, ShowToastPayload } from '../store/slices/feedback-slice';

export default function useToast() {
  const dispatch = useStoreDispatch();

  const close = () => {
    dispatch(closeToast());
  };

  const show = (payload: ShowToastPayload) => {
    dispatch(showToast(payload));
  };

  return {
    show,
    close,
  };
}
