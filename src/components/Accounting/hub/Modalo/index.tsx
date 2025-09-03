'use client'
import React, { useEffect, useRef } from 'react'

export type ConfirmationModalProps = {
  open: boolean
  title?: string
  message: string
  onClose: () => void
  onConfirm: () => void
  dir?: 'rtl' | 'ltr'
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title = 'آیا مطمئنی؟',
  message,
  onClose,
  onConfirm,
  dir = 'rtl',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      dir={dir}
      aria-hidden={!open}
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop */}
      <button
        aria-label="بستن"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="relative w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 animate-[popIn_200ms_ease-out_forwards] opacity-0 translate-y-4 scale-95"
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-700 text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            تایید حذف
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes popIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default ConfirmationModal
