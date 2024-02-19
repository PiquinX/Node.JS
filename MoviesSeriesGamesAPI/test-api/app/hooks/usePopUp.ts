import { useEffect, useId, useState } from 'react'

interface ClickEvent extends MouseEvent {
    target: HTMLElement;
  }

export function usePopUp () {
  const [show, setShow] = useState(false)
  const popUpData = useId()

  useEffect(() => {
    const handleClick = (event: ClickEvent) => {
      const clickedAttribute = event.target.getAttribute('data-pop-up')
      if (clickedAttribute === popUpData) setShow(false)
    }

    addEventListener('click', handleClick)

    return () => {
      removeEventListener('click', handleClick)
    }
  }, [])

  return ({ setShow, show, popUpData })
}
