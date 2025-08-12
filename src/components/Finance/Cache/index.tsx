'use client'
import MainHead from '@/components/Headers/MainHead'
import Input from '@/components/hub/Forms/Input'
import TextArea from '@/components/hub/Forms/TextArea'
import useClickOutside from '@/hook/useClickOutside'
import MainLayout from '@/layouts/Main'
import { RefObject, useRef, useState } from 'react'
import { BsDatabaseFillAdd } from 'react-icons/bs'
import { FaCashRegister } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { GiCardPick, GiCardRandom } from 'react-icons/gi'
import { IoCloseCircle } from 'react-icons/io5'
import { PiCoinsFill } from 'react-icons/pi'

interface CashBox {
  id: number
  name: string
  balance: string
  currency: string
  description: string
}

const initialData: CashBox[] = [
  {
    id: 1,
    name: 'صندوق اول',
    balance: '۵,۰۰۰,۰۰۰',
    currency: 'ریال',
    description: 'صندوق اصلی شرکت',
  },
  {
    id: 2,
    name: 'صندوق دوم',
    balance: '۳,۲۰۰,۰۰۰',
    currency: 'ریال',
    description: 'صندوق امور جاری',
  },
  {
    id: 3,
    name: 'صندوق ارزی',
    balance: '۱,۰۰۰',
    currency: 'دلار',
    description: 'صندوق ذخیره ارزی',
  },
]

const CashBoxes = () => {
  const [data, setData] = useState(initialData)
  const [selectedBox, setSelectedBox] = useState<CashBox | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const handleOpenModal = (box: CashBox) => {
    setSelectedBox(box)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBox(null)
  }

  const handleChange = (resultext: string) => {
    if (!selectedBox) return
    setSelectedBox({ ...selectedBox, [resultext]: resultext })
  }

  const handleSave = () => {
    if (!selectedBox) return
    setData((prev) =>
      prev.map((item) => (item.id === selectedBox.id ? selectedBox : item))
    )
    handleCloseModal()
  }

  const handleDelete = () => {
    if (!selectedBox) return
    setData((prev) => prev.filter((item) => item.id !== selectedBox.id))
    handleCloseModal()
  }

  useClickOutside(modalRef as RefObject<HTMLElement>, () => {
    if (isModalOpen) handleCloseModal()
  })
  return (
    <MainLayout>
      <MainHead
        title="صندوق ها"
        icons={[
          {
            icon: <PiCoinsFill size={35} />,
            label: 'صندوق ها',
            destination: '/finance/cache',
          },
          {
            icon: <GiCardPick size={30} />,
            label: 'لیست مالی',
            destination: '/finance',
          },
          {
            icon: <GiCardRandom size={30} />,
            label: ' بانک ها',
            destination: '/finance/banks',
          },
          {
            icon: <FaMoneyBillTrendUp size={30} />,
            label: 'تنخواه گردان',
            destination: '/finance/imprest',
          },
          {
            icon: <BsDatabaseFillAdd size={30} />,
            label: ' ایجاد',
            destination: '/finance/banks/add',
          },
        ]}
      />
      <div className="min-h-screen p-6 bg-gradient-to-bl from-[#2f27ce6e] to-[#5246ff89] hover:to-[#5246ffc2] rounded-2xl border-8 border-[#3c4ac3]  hover:border-[#111164]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((box) => (
            <div
              key={box.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleOpenModal(box)}
            >
              <div className="bg-[#2f27ce] text-white p-5 rounded-full mb-4 shadow-md">
                <FaCashRegister size={30} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{box.name}</h3>
              <p className="text-gray-600">
                {box.balance} {box.currency}
              </p>
            </div>
          ))}
        </div>

        {isModalOpen && selectedBox && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh] animate-slideInX"
            >
              <IoCloseCircle
                className="text-[44px] cursor-pointer absolute top-4 left-4 text-red-400 hover:text-red-500   transition"
                onClick={handleCloseModal}
              />

              <h3 className="text-2xl font-bold mb-6 text-[#2f27ce] border-b border-blue-700 pb-3">
                ویرایش صندوق
              </h3>
              <div className="space-y-4">
                <Input
                  value={selectedBox.name}
                  onChange={handleChange}
                  placeholder="نام صندوق"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
                />
                <Input
                  value={selectedBox.balance}
                  onChange={handleChange}
                  placeholder="موجودی"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
                />
                <Input
                  value={selectedBox.currency}
                  onChange={handleChange}
                  placeholder="واحد پول"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2f27ce] transition"
                />
                <TextArea
                  label=""
                  value=""
                  rows={4}
                  onChange={handleChange}
                  placeholder="توضیحات"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg w-full sm:w-auto transition"
                >
                  حذف
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#2f27ce] hover:bg-[#1d1aa8] text-white px-5 py-2 rounded-lg w-full sm:w-auto transition"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
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
    </MainLayout>
  )
}

export default CashBoxes
