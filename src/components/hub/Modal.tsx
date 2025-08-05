interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
      <div className='relative bg-white w-[90%]   max-h-[80vh] overflow-y-auto rounded-2xl p-6 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-blue-600 hover:text-blue-800 text-xl transition-all'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
