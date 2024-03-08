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

    addEventListener('mousedown', handleClick)

    return () => {
      removeEventListener('mousedown', handleClick)
    }
  }, [])

  return ({ setShow, show, popUpData })
}
