interface ConfirmDialogProps {
  message: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  imageSrc?: string
}

export const ConfirmDialog = ({
  message,
  description,
  onConfirm,
  onCancel,
  imageSrc,
}: ConfirmDialogProps) => {
  return (
    <div className='fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-sm text-center p-6 relative'>
        {imageSrc && (
          <div className='flex justify-center -mt-16 mb-4'>
            <img
              src={imageSrc}
              alt='confirm image'
              className='w-24 h-24 object-cover rounded-full border-4 border-white shadow-md'
            />
          </div>
        )}

        <h3 className='text-xl font-semibold text-gray-800 mb-2'>{message}</h3>

        {description && (
          <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
            {description}
          </p>
        )}

        <div className='flex justify-center gap-3 mt-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded-xl border text-blue-600 border-blue-600 hover:bg-blue-50 transition-all'
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all'
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  )
}
