import { useEffect, RefObject } from 'react'
type Handler = (event: MouseEvent | TouchEvent) => void
function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el) return
      if (event.target instanceof Node && el.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener(mouseEvent, listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener(mouseEvent, listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, mouseEvent])
}
export default useClickOutside