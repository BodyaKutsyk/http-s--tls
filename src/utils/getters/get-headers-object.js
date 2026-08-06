export default function getHeadersObject(rawHeadersArray) {
  const headers = {};

  rawHeadersArray.forEach(row => {
    const index = row.indexOf(':');
    const key = row.slice(0, index).trim().toLowerCase();
    const value = row.slice(index + 1).trim();

    headers[key] = value;
  })

  return headers;
}