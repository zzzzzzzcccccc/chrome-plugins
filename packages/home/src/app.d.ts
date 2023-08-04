declare module 'generate-schema' {
  export function json<T>(root: string, target: T): object;
  export function mysql<T>(target: T): string;
  export function generic<T>(target: T): string;
  export function mongoose<T>(target: T): string;
  export function bigquery<T>(target: T): string;
}

declare module 'json-to-kotlin-class' {
  export function init<T>(target: T): string;
}
