import { useEffect, useState } from 'react'

function useScreenWidthHeightHook() {
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)

  useEffect(() => {
    const HandleScreenWidthHeightChange = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', HandleScreenWidthHeightChange)
    HandleScreenWidthHeightChange()
    return () =>
      window.removeEventListener('resize', HandleScreenWidthHeightChange)
  }, [])

  return [width, height]
}

export default useScreenWidthHeightHook
