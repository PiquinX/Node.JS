import BooksController from '../Controllers/BooksController'

export default function BooksLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <BooksController />
        {children}
    </>
  )
}
