import React from 'react';
import { Mask } from '../components';
import { useInjectContext } from '../context';

export default function App() {
  const { clientHeight, clientWidth } = useInjectContext()
  return(
    <>
      <Mask style={{ width: clientWidth, height: clientHeight, zIndex: 9999999 }}>
        hello world
      </Mask>
    </>
  )
}
