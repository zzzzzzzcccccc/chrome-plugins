import React from 'react';
import { ScreenshotProps } from '.'
import useMouse from './hooks/use-mouse'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export default function Screenshot(props: ScreenshotProps) {
  const {  } = useMouse()
  return(
    <Wrapper>
      <div role="screenshot-top" />
      <div role="screenshot-left" />
      <div role="screenshot-right" />
      <div role="screenshot-bottom" />
    </Wrapper>
  )
}
