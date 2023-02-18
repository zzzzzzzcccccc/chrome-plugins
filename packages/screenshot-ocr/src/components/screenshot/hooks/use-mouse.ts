import React, { useEffect } from 'react';

export default function useMouse() {

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      console.log(e)
    }

    const onMouseEnd = () => {
      console.log('end')
      document.body.removeEventListener('mousemove', onMouseMove, false)
      document.body.removeEventListener('mouseup', onMouseEnd, false)
    }

    const listenMouse = () => {
      document.body.addEventListener('mousemove', onMouseMove, false)
      document.body.addEventListener('mouseup', onMouseEnd, false)
    }

    const handleOnMouseStart = (e: MouseEvent) => {
      e.stopPropagation()
      listenMouse()
    }

    document.body.addEventListener('mousedown', handleOnMouseStart)

    return () => {
      document.body.removeEventListener('mousedown', handleOnMouseStart)
    }
  }, [])

  return {
  }
}
