const HTTP_VERSION = 'http/1.1'

export default function serializeStatusLine({ statusCode, reasonPhrase }) {
  return `${HTTP_VERSION} ${statusCode} ${reasonPhrase}`;
}