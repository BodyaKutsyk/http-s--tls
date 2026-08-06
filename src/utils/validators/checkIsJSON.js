export default function checkIsJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}