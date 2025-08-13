'use client'
import MainHead from '@/components/Headers/MainHead'
import MainLayout from '@/layouts/Main'
import { BsPlusLg } from 'react-icons/bs'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { MdCategory, MdOutlineAddCard } from 'react-icons/md'
import { useState } from 'react'
import { bankCardImage } from './Cards/MatchingBankCards'
import BankCard from './Cards/BankCard'
export interface ImprestInterface {
  sheba: string
  dateTime: string
  balance: string
  bankCode: string
}
interface PositionedCard extends ImprestInterface {
  x: number
  y: number
}

const initialData: PositionedCard[] = Array.from(
  { length: 30 },
  (key, index) => ({
    sheba: 'تنخواه گردان سامان',
    dateTime: '۵,۰۰۰,۰۰۰',
    balance: 'ریال',
    bankCode: Object.keys(bankCardImage)[index] || '066',
    x: index % 2 === 0 ? 10 * index : -10 * index,
    y: index % 2 === 0 ? 10 * index : 10 * index,
  })
)

const Banks = () => {
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
        sheba: 'تنخواه گردان سامان',
        dateTime: '۵,۰۰۰,۰۰۰',
        balance: 'ریال',
        bankCode: '066',
        x: 100,
        y: 100,
      },
    ])
  }

  return (
    <MainLayout>
      <MainHead
        title="لیست بانک ها"
        icons={[
          {
            icon: <HiClipboardDocumentList size={30} />,
            label: 'لیست بانک ها',
            destination: 'finance/banks',
          },
          {
            icon: <MdOutlineAddCard size={30} />,
            label: 'افزودن حساب بانکی',
            destination: 'finance/banks/add',
          },
          {
            icon: <MdCategory size={30} />,
            label: 'جدول حساب ها',
            destination: 'finance/banks/acctypes',
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
          <BankCard
            cards={{
              sheba: 'shebashesha',
              dateTime: '333',
              balance: '334433334433334433',
              bankCode: card.bankCode,
            }}
            position={{ x: 333 + card.x, y: card.y }}
            // index: number
            // onPositionChange: (index: number, pos: { x: number; y: number }) => void
            // onClick: () => void
            key={index}
            index={index}
            onPositionChange={updatePosition}
            onClick={() => console.log('Edit', card)}
          />
        ))}
      </div>
    </MainLayout>
  )
}

export default Banks
