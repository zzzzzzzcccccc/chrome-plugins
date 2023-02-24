declare module '@paddlejs-models/ocrdet' {
  export function load(): Promise<void>;
  export function detect(target: HTMLImageElement): Promise<string>;
}
