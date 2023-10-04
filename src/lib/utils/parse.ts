export function parse<T>(data: string): T | null {
  try {
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}
