const HTTP_VERSION = 'HTTP/1.1'

export default function serializeStatusLine({ statusCode, reasonPhrase }) {
  return `${HTTP_VERSION} ${statusCode} ${reasonPhrase}`;
}