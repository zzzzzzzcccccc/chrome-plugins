import { StoreDispatch, StoreState } from '../store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useStoreDispatch: () => StoreDispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
