interface Props {
    id: string
    errors: string[] | null
}

const FormErrorMessage: React.FC<Props> = ({ id, errors }) => {
  return (
        <div id={id} aria-live="polite" aria-atomic="true">
              {
                errors &&
                errors.map((error: string) => (
                    <p className="mt-2 text-red-500" key={error}>
                      {error}
                    </p>
                ))
              }
        </div>
  )
}

export default FormErrorMessage
