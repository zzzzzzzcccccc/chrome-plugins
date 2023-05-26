import { SnackbarProps, AlertProps } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeedbackState {
  snackbar: {
    open: SnackbarProps['open'];
    delay: SnackbarProps['autoHideDuration'];
    message: SnackbarProps['message'];
    type?: AlertProps['severity'];
    action?: SnackbarProps['action'];
    origin?: SnackbarProps['anchorOrigin'];
  };
}

export type ShowToastPayload = Partial<Omit<FeedbackState['snackbar'], 'open'>>;

const initialState: FeedbackState = {
  snackbar: {
    open: false,
    delay: 5000,
    message: '',
    type: undefined,
    origin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  },
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      const { payload } = action;
      state.snackbar.type = payload.type;
      state.snackbar.message = payload.message;
      state.snackbar.delay = payload.delay || initialState.snackbar.delay;
      state.snackbar.origin = payload.origin || initialState.snackbar.origin;
      state.snackbar.open = true;
    },
    closeToast: (state) => {
      state.snackbar = initialState.snackbar;
    },
  },
});

export const { showToast, closeToast } = feedbackSlice.actions;

export default feedbackSlice.reducer;
