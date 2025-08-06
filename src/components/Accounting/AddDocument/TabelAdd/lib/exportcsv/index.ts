export function generateCsvBlob(content: string): Blob {
  const utf8Encoder = new TextEncoder(); // به‌طور پیش‌فرض UTF-8
  const encoded = utf8Encoder.encode(content);
  return new Blob([encoded], { type: "text/csv;charset=utf-8" });
}
