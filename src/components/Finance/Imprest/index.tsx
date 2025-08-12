'use client'
import { useState } from 'react'
import { BsDatabaseFillAdd, BsPlusLg } from 'react-icons/bs'
import CardItem, { ImprestInterface } from './CardItem/page'
import MainLayout from '@/layouts/Main'
import MainHead from '@/components/Headers/MainHead'
import { PiCoinsFill } from 'react-icons/pi'
import { GiCardPick, GiCardRandom } from 'react-icons/gi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'

interface PositionedCard extends ImprestInterface {
  x: number
  y: number
}

const initialData: PositionedCard[] = [
  {
    id: 1,
    name: 'تنخواه گردان سامان',
    balance: '۵,۰۰۰,۰۰۰',
    currency: 'ریال',
    description: 'توضیحات نمونه...',
    x: 50,
    y: 50,
  },
]

export default function Imprest() {
  const [cards, setCards] = useState<PositionedCard[]>(initialData)

  const updatePosition = (index: number, pos: { x: number; y: number }) => {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, ...pos } : card))
    )
  }

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'کارت جدید',
        balance: '۰',
        currency: 'ریال',
        description: '',
        x: 100,
        y: 100,
      },
    ])
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
      <div className="select-none relative min-h-screen p-6 bg-gradient-to-bl from-[#2794ce6e] to-[#aac4f489] rounded-2xl overflow-hidden">
        <div className="flex justify-end mb-6">
          <button
            onClick={addCard}
            className="flex items-center gap-2 bg-[#111194] hover:bg-[#2550ad] text-white px-5 py-2 rounded-lg transition"
          >
            <BsPlusLg />
            افزودن تنخواه
          </button>
        </div>

        {cards.map((card, index) => (
          <CardItem
            key={card.id}
            box={card}
            position={{ x: card.x, y: card.y }}
            index={index}
            onPositionChange={updatePosition}
            onClick={() => console.log('Edit', card)}
          />
        ))}
      </div>
    </MainLayout>
  )
}

// 'use client'
// import { useState } from 'react'
// import { FaMoneyBillTrendUp } from 'react-icons/fa6'
// import { BsDatabaseFillAdd, BsPlusLg } from 'react-icons/bs'
// import MainLayout from '@/layouts/Main'
// import MainHead from '@/components/Headers/MainHead'
// import { PiCoinsFill } from 'react-icons/pi'
// import { GiCardPick, GiCardRandom } from 'react-icons/gi'
// import CardItem, { ImprestInterface } from './CardItem/page'
// import ImprestModal from './ImprestModal/page'

// const initialData: ImprestInterface[] = [
//   {
//     id: 1,
//     name: 'تنخواه گردان سامان',
//     balance: '۵,۰۰۰,۰۰۰',
//     currency: 'ریال',
//     description: 'توضیحات نمونه...',
//   },
// ]

// const Imprest = () => {
//   const [data, setData] = useState(initialData)
//   const [modalData, setModalData] = useState<ImprestInterface | null>(null)
//   const [isEdit, setIsEdit] = useState(false)

//   const openEditModal = (box: ImprestInterface) => {
//     setModalData({ ...box })
//     setIsEdit(true)
//   }

//   const openAddModal = () => {
//     setModalData({
//       id: Date.now(),
//       name: '',
//       balance: '',
//       currency: '',
//       description: '',
//     })
//     setIsEdit(false)
//   }

//   return (
// <MainLayout>
//   <MainHead
//     title="تنخواه گردان ها"
//     icons={[
//       {
//         icon: <PiCoinsFill size={35} />,
//         label: 'تنخواه ها',
//         destination: '/finance/cache',
//       },
//       {
//         icon: <GiCardPick size={30} />,
//         label: 'لیست مالی',
//         destination: '/finance',
//       },

//       {
//         icon: <GiCardRandom size={30} />,
//         label: ' بانک ها',
//         destination: '/finance/banks',
//       },
//       {
//         icon: <FaMoneyBillTrendUp size={30} />,
//         label: 'تنخواه گردان',
//         destination: '/finance/imprest',
//       },
//       {
//         icon: <BsDatabaseFillAdd size={30} />,
//         label: ' ایجاد',
//         destination: '/finance/banks/add',
//       },
//     ]}
//   />
//       <div className="min-h-screen p-6 bg-gradient-to-bl from-[#2794ce6e] to-[#aac4f489] rounded-2xl border-8 border-[#2b58e0] hover:border-[#205898] transition-all">
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={openAddModal}
//             className="flex items-center gap-2 bg-[#111194] hover:bg-[#2550ad] text-white px-5 py-2 rounded-lg transition"
//           >
//             <BsPlusLg />
//             افزودن تنخواه
//           </button>
//         </div>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {data.map((box) => (
//             <CardItem
//               key={box.id}
//               box={box}
//               onClick={() => openEditModal(box)}
//             />
//           ))}
//         </div>
//         {modalData && (
//           <ImprestModal
//             title={isEdit ? 'ویرایش تنخواه' : 'افزودن تنخواه'}
//             data={modalData}
//             setData={setModalData}
//             onClose={() => setModalData(null)}
//             isEdit={isEdit}
//           />
//         )}
//       </div>
//     </MainLayout>
//   )
// }

// export default Imprest
