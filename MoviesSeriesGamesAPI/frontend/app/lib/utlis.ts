'use server'

import { redirect } from 'next/navigation'

export async function isValidImageUrl (url: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    console.log(response)
    return response.ok
  } catch (err) {
    console.log(err)
    return false
  }
}

export const handleCloseModal = (
  { isRedirectable, newPath }: { isRedirectable: boolean, newPath: string }
) => {
  console.log({
    isRedirectable,
    newPath
  })
  if (isRedirectable) redirect(newPath)
}
