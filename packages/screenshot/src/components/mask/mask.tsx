import React from 'react';
import { MaskProps } from '.';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.46);
`;

export default function Mask(props: MaskProps) {
  const { className, style, children, onClick } = props;

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (
    <Wrapper className={className} style={style} onClick={handleOnClick}>
      {children}
    </Wrapper>
  );
}
