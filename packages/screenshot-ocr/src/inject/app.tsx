import React, { useEffect, useState } from 'react';
import { Mask, Screenshot } from '../components';
import { useInjectContext } from '../context';

function getScrollWidthHeight() {
  const body = document.body
  return {
    width: body.scrollWidth,
    height: body.scrollHeight,
  }
}

export default function App() {
  const [ scrollLayout, setScrollLayout ] = useState<{ width: number; height: number; }>(getScrollWidthHeight())

  useEffect(() => {
    let timer: NodeJS.Timer | null = null
    const removeTiler = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    window.onresize = (e) => {
      removeTiler()
      timer = setTimeout(() => {
        setScrollLayout(prev => ({ ...prev, ...getScrollWidthHeight() }))
      }, 500)
    }
    return () => {
      removeTiler();
      window.onresize = null;
    }
  }, [])

  return(
    <>
      <Mask style={{ zIndex: 9999999, ...scrollLayout, cursor: 'crosshair' }}>
        <Screenshot />
      </Mask>
    </>
  )
}
