import React, { useRef } from 'react'
import Image from 'next/image'
import { bankCardImage } from '../MatchingBankCards'
import { BiCopy } from 'react-icons/bi'
export interface ImprestInterface {
  id: number
  name: string
  balance: string
  currency: string
  description: string
}

interface Card {
  sheba: string
  dateTime: string
  balance: string
  bankCode: string
}
type BankCardProps = {
  cards: Card
  position: { x: number; y: number }
  index: number
  onPositionChange: (index: number, pos: { x: number; y: number }) => void
  onClick: () => void
}
const whiteText = ['055', '011', '012', '017', '057', '015']
const whiteButton = ['011', '012', '057']
const firstLineMargin = ['013', '066', '012']
const BankCard: React.FC<BankCardProps> = ({
  cards,
  position,
  index,
  onPositionChange,
  onClick,
}) => {
  const dragInfo = useRef<{ offsetX: number; offsetY: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    dragInfo.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // جلوگیری از انتخاب متن هنگام درگ
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current) return
    onPositionChange(index, {
      x: e.clientX - dragInfo.current.offsetX,
      y: e.clientY - dragInfo.current.offsetY,
    })
  }

  const handleMouseUp = () => {
    dragInfo.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-80 py-1 flex flex-col items-center 
                 border-[1px] border-x-blue-400 border-y-blue-600 animate-fadeIn 
                 hover:shadow-2xl hover:scale-110 hover:z-10 hover:rotate-4 transition-all duration-300"
    >
      <Image
        src={bankCardImage[cards.bankCode] || '/images/bank-cards/saman.svg'}
        width={320}
        height={179}
        alt="saman"
        className="rounded-lg h-fit"
      />
      <div
        className={`w-full absolute flex flex-col gap-4 bottom-4 px-3 ${
          whiteText.includes(cards.bankCode) && 'text-white'
        } ${firstLineMargin.includes(cards.bankCode) && ' bottom-3'}`}
      >
        <div className={`flex justify-between w-full `}>
          <BiCopy
            size={24}
            color={whiteText.includes(cards.bankCode) ? '#fff' : '#2F27CE'}
          />
          <span>{cards.sheba}</span>
        </div>
        <div className="flex justify-between w-full ">
          <span>{cards.balance}</span>
          <span>: موجودی قابل برداشت </span>
        </div>
        <div className="flex justify-between w-full ">
          <button
            className={`h-7 w-[110px] ${
              whiteButton.includes(cards.bankCode)
                ? 'bg-white text-[#2F27CE] rounded-lg hover:bg-blue-100'
                : 'bg-[#2F27CE] text-white rounded-lg hover:bg-blue-800'
            }`}
          >
            به روزرسانی
          </button>
          <div className="flex">
            <span>{cards.dateTime}</span>
            <span> : آخرین به روزرسانی</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankCard
