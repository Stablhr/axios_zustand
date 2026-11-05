import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // The app's scroll container is the inner <main className="scroll-area">,
    // not the window, so it has to be reset explicitly too.
    document.querySelector('.scroll-area')?.scrollTo(0, 0)
  }, [pathname])

  return null
}
