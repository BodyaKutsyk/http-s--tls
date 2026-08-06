export default function serializeHeaders(headers) {
  let serializedHeaders = '';

  for (const header in headers) {
    serializedHeaders += `${header}: ${headers[header]}\r\n`
  }

  return serializedHeaders;
}