import React from 'react';
import LazyWrapper from '../lazy-wrapper';
import JsonEditor from '../json-editor';
import Base64Editor from '../base64-editor';
import StringEditor from '../string-editor';
import HTMLToJSXEditor from '../html-to-jsx-editor';
import MD5Editor from '../md5-editor';
import AESEditor from '../aes-editor';
import SHAEditor from '../sha-editor';
import RabbitEditor from '../rabbit-editor';
import ReadFile from '../read-file';

const routers = [
  {
    path: 'json-editor',
    element: (
      <LazyWrapper>
        <JsonEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'base64-editor',
    element: (
      <LazyWrapper>
        <Base64Editor />
      </LazyWrapper>
    ),
  },
  {
    path: 'string-editor',
    element: (
      <LazyWrapper>
        <StringEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'html-to-jsx-editor',
    element: (
      <LazyWrapper>
        <HTMLToJSXEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'md5-editor',
    element: (
      <LazyWrapper>
        <MD5Editor />
      </LazyWrapper>
    ),
  },
  {
    path: 'aes-editor',
    element: (
      <LazyWrapper>
        <AESEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'sha-editor',
    element: (
      <LazyWrapper>
        <SHAEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'rabbit-editor',
    element: (
      <LazyWrapper>
        <RabbitEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'read-file',
    element: (
      <LazyWrapper>
        <ReadFile />
      </LazyWrapper>
    ),
  },
];

export default routers;