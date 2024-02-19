import { useEffect, useState } from 'react'
import { MovieFormType } from '../lib/definitions'
import { isValidImageUrl } from '../lib/utlis'

export function useMoviesForm () {
  const [formData, setFormData] = useState<MovieFormType>({
    title: '',
    poster: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  const handleChangePoster = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = structuredClone(formData)

    newFormData.poster = event.target.value
    setFormData(newFormData)
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = structuredClone(formData)

    newFormData.title = event.target.value
    setFormData(newFormData)
  }

  const handleResetForm = () => {
    setFormData({
      title: '',
      poster: ''
    })
  }

  useEffect(() => {
    const validPoster = async (): Promise<void> => {
      const isValid = await isValidImageUrl(formData.poster)
      if (isValid) {
        setError(null)
        setIsInvalid(false)
      } else {
        setError('Invalid URL')
        setIsInvalid(true)
      }
    }

    validPoster()
  }, [formData.poster])

  return {
    formData,
    handleChangePoster,
    handleChangeTitle,
    handleResetForm,
    error,
    setError,
    isInvalid
  }
}
