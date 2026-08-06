export default function getRequestLine(rawRequestLine) {
  const [method, path, version] = rawRequestLine.split(' ');

  return { method, path, version };
}