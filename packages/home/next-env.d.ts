/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
declare module 'generate-schema' {
  export const json = (title: string, target: any) => any;
  export const mysql = (target: any) => string;
}
