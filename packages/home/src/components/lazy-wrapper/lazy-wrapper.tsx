import React from 'react';
import { LazyProps } from './types';

export default function LazyWrapper(props: LazyProps) {
  const { children } = props;

  return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
}
