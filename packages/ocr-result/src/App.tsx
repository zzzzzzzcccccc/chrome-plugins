import React from 'react';
import useApp from './hooks/use-app';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

function App() {
  const { imageRef, canvasRef, ocrText, imageMetaData } = useApp();

  return (
    <Wrapper>
      <h3>Screenshot</h3>
      <img alt="source" ref={imageRef} src={imageMetaData?.base64} />
      <h3>OCR Area</h3>
      <canvas ref={canvasRef} />
      <h3>OCR Text</h3>
      <div dangerouslySetInnerHTML={{ __html: ocrText }} />
    </Wrapper>
  );
}

export default App;
