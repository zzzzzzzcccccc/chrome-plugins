import { createContext, useContext } from 'react';

export interface IInjectContext {
  root: HTMLDivElement | null,
  clientWidth: number
  clientHeight: number
}

const initialContext: IInjectContext = {
  root: null,
  clientWidth: 0,
  clientHeight: 0
}

const InjectContext = createContext(initialContext);

export const useInjectContext = () => {
  return useContext(InjectContext)
}

export default InjectContext
