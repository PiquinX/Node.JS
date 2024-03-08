'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Movies', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'Books', href: '/books' }
]

export const Header = () => {
  const pathName = usePathname()

  return (
        <header className="flex w-full items-start gap-4 border-b border-b-gray-300">
          {
            links.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                scroll={false}
                className={`${pathName === link.href ? 'border-black' : 'border-transparent opacity-50'} px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2`}
              >
                {link.name}
              </Link>
            ))
          }
        </header>
  )
}
