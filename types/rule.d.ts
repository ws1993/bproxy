export interface IRule {
  regx: RegExp | string | Function;
  host?: string;
  file?: string;
  path?: string;
  response?: Function | string;
  redirect?: string;
  proxy?: string;
  showLog?: boolean;
  download?: boolean;
  responseHeaders?: any;
  statusCode?: number;
}
