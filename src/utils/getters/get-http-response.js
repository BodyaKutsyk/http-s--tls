export default function getHttpResponse({ statusLine, headers, body }) {
  const header = [statusLine, headers].join('\r\n');
  let response = header + '\r\n';

  if (body) {
    response += body + '\r\n';
  }

  return response;
}