export async function isValidImageUrl (url: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    return response.ok
  } catch (err) {
    return false
  }
}
