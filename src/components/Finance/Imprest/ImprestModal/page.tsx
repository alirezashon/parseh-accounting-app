import { RefObject, useRef } from 'react'
import { ImprestInterface } from '../CardItem/page'
import useClickOutside from '@/hook/useClickOutside'
import { IoCloseCircle } from 'react-icons/io5'

const ImprestModal = ({
  title,
  data,
  setData,
  onClose,
  isEdit,
}: {
  title: string
  data: ImprestInterface
  setData: (val: ImprestInterface) => void
  onClose: () => void
  isEdit: boolean
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalRef as RefObject<HTMLElement>, () => {
    onClose()
  })

  const handleChange = (field: keyof ImprestInterface, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh] animate-slideInX"
      >
        <IoCloseCircle
          className="text-[44px] cursor-pointer absolute top-4 left-4 text-red-400 hover:text-red-500 transition"
          onClick={onClose}
        />
        <h3 className="text-2xl font-bold mb-6 text-[#2f27ce] border-b border-blue-700 pb-3">
          {title}
        </h3>
        <div className="space-y-4">
          <input
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="نام تنخواه"
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
          />
          <input
            value={data.balance}
            onChange={(e) => handleChange('balance', e.target.value)}
            placeholder="موجودی"
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
          />
          <input
            value={data.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            placeholder="واحد پول"
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
          />
          <textarea
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            placeholder="توضیحات"
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition resize-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          {isEdit && (
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg w-full sm:w-auto transition"
            >
              حذف
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-[#2f27ce] hover:bg-[#1d1aa8] text-white px-5 py-2 rounded-lg w-full sm:w-auto transition"
          >
            {isEdit ? 'ذخیره تغییرات' : 'افزودن'}
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes slideInX {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInX {
          animation: slideInX 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
export default ImprestModal
