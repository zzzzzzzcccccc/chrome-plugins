import React from 'react';
import useApp from './hooks/use-app';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  h3 {
    width: 100%;
    padding: 6px;
    margin: 0;
  }
  p {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    line-height: 1.6;
  }
  .ocr-img {
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 100%;
    overflow: auto;
  }
  canvas {
    display: block;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .ocr-text {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
  }
  .ocr-result {
    flex: 1.4;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
  }
`;

function App() {
  const { imageRef, canvasRef, ocrResult, imageMetaData, copyText } = useApp();

  return (
    <>
      <img alt="source" ref={imageRef} src={imageMetaData?.base64} style={{ display: 'none' }} />
      <Wrapper>
        <div style={{ flex: 1 }}>
          <h3>OCR Text</h3>
          <div className="ocr-text" dangerouslySetInnerHTML={{ __html: ocrResult.htmlText }} />
          {ocrResult.text && <button onClick={copyText}>copy text</button>}
        </div>

        <div className="ocr-result">
          <div style={{ flex: 1 }}>
            <h3>OCR Area</h3>
            <canvas ref={canvasRef} />
          </div>

          <div style={{ flex: 1 }}>
            <h3>Screenshot</h3>
            <div className="ocr-img">
              {imageMetaData?.base64 && (
                <img
                  src={imageMetaData?.base64}
                  alt="source-preview"
                  style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
                />
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default App;
