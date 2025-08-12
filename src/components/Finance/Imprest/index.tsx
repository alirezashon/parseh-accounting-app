'use client'
import { useState } from 'react'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { BsDatabaseFillAdd, BsPlusLg } from 'react-icons/bs'
import MainLayout from '@/layouts/Main'
import MainHead from '@/components/Headers/MainHead'
import { PiCoinsFill } from 'react-icons/pi'
import { GiCardPick, GiCardRandom } from 'react-icons/gi'
import CardItem, { ImprestInterface } from './CardItem/page'
import ImprestModal from './ImprestModal/page'

const initialData: ImprestInterface[] = [
  {
    id: 1,
    name: 'تنخواه گردان سامان',
    balance: '۵,۰۰۰,۰۰۰',
    currency: 'ریال',
    description: 'توضیحات نمونه...',
  },
]

const Imprest = () => {
  const [data, setData] = useState(initialData)
  const [modalData, setModalData] = useState<ImprestInterface | null>(null)
  const [isEdit, setIsEdit] = useState(false)

  const openEditModal = (box: ImprestInterface) => {
    setModalData({ ...box })
    setIsEdit(true)
  }

  const openAddModal = () => {
    setModalData({
      id: Date.now(),
      name: '',
      balance: '',
      currency: '',
      description: '',
    })
    setIsEdit(false)
  }

  return (
    <MainLayout>
      <MainHead
        title="تنخواه گردان ها"
        icons={[
          {
            icon: <PiCoinsFill size={35} />,
            label: 'تنخواه ها',
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
      <div className="min-h-screen p-6 bg-gradient-to-bl from-[#2794ce6e] to-[#aac4f489] rounded-2xl border-8 border-[#2b58e0] hover:border-[#205898] transition-all">
        <div className="flex justify-end mb-6">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#111194] hover:bg-[#2550ad] text-white px-5 py-2 rounded-lg transition"
          >
            <BsPlusLg />
            افزودن تنخواه
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((box) => (
            <CardItem
              key={box.id}
              box={box}
              onClick={() => openEditModal(box)}
            />
          ))}
        </div>
        {modalData && (
          <ImprestModal
            title={isEdit ? 'ویرایش تنخواه' : 'افزودن تنخواه'}
            data={modalData}
            setData={setModalData}
            onClose={() => setModalData(null)}
            isEdit={isEdit}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Imprest
