import { useEffect } from 'react'

// ref - node to which outside click shouldnt work or click shouldnt invoke the outside click function
// setDrop - function what happens on outside click
// parentRef - parentNode or other node where click shouldnt do anythink
function useOutsideClick(ref, setDrop, parentRef) {
  /**
   * Alert if clicked on outside of element
   */

  function handleClickOutside(event) {
    if (parentRef) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!parentRef.current.contains(event.target)) {
          setDrop()
        }
      }
    } else if (ref.current && !ref.current.contains(event.target)) {
      setDrop()
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

export default useOutsideClick
