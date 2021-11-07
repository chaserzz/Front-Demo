export interface ICodeMirrorConfig {
  mode: string,
  lineNumbers: boolean,
  theme: string,
  tabSize: number,
  readonly: boolean | "nocursor"
}