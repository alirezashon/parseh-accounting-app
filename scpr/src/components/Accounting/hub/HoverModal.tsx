import { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { FaTimes } from "react-icons/fa"

export function HoverModal({
  trigger,
  children,
  widthClass = 'max-w-xl w-full',
  dir = 'rtl',
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  widthClass?: string
  dir?: 'rtl' | 'ltr'
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  // بازشدن با هاور
  const onEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setOpen(true)
  }
  const onLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  // بستن با ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // اسکرول به اندازه مودال هنگام باز شدن
  useLayoutEffect(() => {
    if (open && modalRef.current) {
      const h = modalRef.current.offsetHeight || 0
      window.scrollBy({ top: h, behavior: 'smooth' })
    }
  }, [open])

  // موقعیت‌دهی نزدیک trigger
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  )
  useLayoutEffect(() => {
    if (!open) return
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // نمایش دقیقاً پایین-چپِ trigger در صفحه (با درنظر گرفتن اسکرول)
    setCoords({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    })
  }, [open])

  // رندر پرتال مودال
  const modal =
    open && coords
      ? ReactDOM.createPortal(
          <div
            dir={dir}
            className="fixed inset-0 z-50"
            aria-modal="true"
            role="dialog"
          >
            {/* کلیک بیرون برای بستن */}
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <div
              ref={modalRef}
              style={{ top: coords.top, left: coords.left }}
              className={`absolute ${widthClass} rounded-2xl border border-slate-200 bg-white shadow-xl p-4`}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <button
                aria-label="بستن"
                onClick={() => setOpen(false)}
                className="absolute -top-3 -end-3 inline-flex items-center justify-center rounded-full bg-white shadow p-2 text-slate-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <FaTimes />
              </button>
              {children}
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <div
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {trigger}
      {modal}
    </div>
  )
}
