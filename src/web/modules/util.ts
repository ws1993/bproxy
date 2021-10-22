import * as qs from 'qs';

export const parseURL = (url) => {
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  const res = {
    hostname: a.hostname,
    path: a.pathname,
    protocol: a.protocol.replace(':', ''),
    query: a.search.replace('?' ,''),
    origin: a.origin,
  };
  return res;
}

export const arrayBuf2string = (buf: any) => {
  const enc = new TextDecoder('utf-8');

  return enc.decode(buf);
}

export const parseQueryString = (query: string) => {
  if (!query) {
    return {};
  }
  return qs.parse(query);
}

export const parseRequest = (req: any) => {
  const { hostname, path, protocol, query, origin } = parseURL(req.url);
  const params = parseQueryString(query);

  return Object.assign(req, {
    host: hostname,
    path,
    protocol,
    origin,
    requestParams: params,
  });
};
