export default function parseRawHttp(rawHttp) {
  const [requestHeader, requestBody] = rawHttp.split('\r\n\r\n');
  const requestHeaderArray = requestHeader.split('\r\n');
  const rawRequestLine = requestHeaderArray[0];
  const rawHeaders = requestHeaderArray.slice(1);

  return { rawHeaders, rawRequestLine, requestBody }
}