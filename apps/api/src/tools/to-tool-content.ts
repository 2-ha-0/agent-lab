/** vLLM treats array items with a `type` field as chat content parts. */
export function toToolContent(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}
