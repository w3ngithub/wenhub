import { useLayoutEffect } from 'react'

function useLockBodyScroll(visible) {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    document.body.style.overflow = visible ? 'hidden' : originalStyle
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, [visible]) // Empty array ensures effect is only run on mount and unmount
}

export default useLockBodyScroll
