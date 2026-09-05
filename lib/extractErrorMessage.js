// FastAPI returns `detail` as a plain string for most errors, but as an array of
// {type, loc, msg, ...} objects for 422 validation errors. Rendering that array
// directly (e.g. as JSX or into a toast) crashes or shows "[object Object]", so
// every error-handling call site should go through this instead of `err?.data?.detail`.
export function extractErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const detail = err?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((d) => d?.msg).filter(Boolean);
    if (messages.length) return messages.join(", ");
  }
  return fallback;
}
