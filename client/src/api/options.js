export default function setOptions(details, method = "POST") {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...details,
    }),
  };
}