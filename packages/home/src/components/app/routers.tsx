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
import JsonYamlEditor from '../json-yaml-editor';
import XmlJsonEditor from '../xml-json-editor';
import UrlParse from '../url-parse';
import CssJsEditor from '../css-js-editor';
import CssEditor from '../css-editor';
import JsonSchemaEditor from '../json-schema-editor';

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
  {
    path: 'json-yaml-editor',
    element: (
      <LazyWrapper>
        <JsonYamlEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'xml-json-editor',
    element: (
      <LazyWrapper>
        <XmlJsonEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'url-parse',
    element: (
      <LazyWrapper>
        <UrlParse />
      </LazyWrapper>
    ),
  },
  {
    path: 'css-js-editor',
    element: (
      <LazyWrapper>
        <CssJsEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'css-editor',
    element: (
      <LazyWrapper>
        <CssEditor />
      </LazyWrapper>
    ),
  },
  {
    path: 'json-schema-editor',
    element: (
      <LazyWrapper>
        <JsonSchemaEditor />
      </LazyWrapper>
    ),
  },
];

export default routers;
