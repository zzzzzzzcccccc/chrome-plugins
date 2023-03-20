import { useContext } from 'react';
import { InitializeContext } from '../context';

export default function useInitialize() {
  return useContext(InitializeContext);
}
