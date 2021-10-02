import { useLayoutEffect } from 'react'

function useLockBodyScroll(visible) {
  useLayoutEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = visible ? 'hidden' : 'visible'

    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = 'visible')
  }, [visible])
}

export default useLockBodyScroll
