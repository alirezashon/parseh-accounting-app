'use client'

import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { useRef } from 'react'
import { iconso } from '@/components/hub/Icons'

export interface ImprestInterface {
  id: number
  name: string
  balance: string
  currency: string
  description: string
}

interface Props {
  box: ImprestInterface
  position: { x: number; y: number }
  index: number
  onPositionChange: (index: number, pos: { x: number; y: number }) => void
  onClick: () => void
}

const CardItem = ({
  box,
  position,
  index,
  onPositionChange,
  onClick,
}: Props) => {
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
                 border-[7px] border-x-blue-400 border-y-blue-600 animate-fadeIn 
                 hover:shadow-2xl hover:scale-110 hover:z-10 hover:rotate-4 transition-all duration-300"
    >
      <div className="w-full flex justify-between">
        <div className="w-full text-lg flex flex-col justify-around bg-blue-100 text-blue-800 px-5">
          <p className="font-semibold mb-1">{box.name}</p>
          <p className="text-gray-600">{`${box.currency}  ${box.balance}`}</p>
        </div>
        <div className="flex gap-2 border-r-2 border-blue-400">
          <div className="bg-[#2f27ce] text-white p-5 rounded-full mb-4 shadow-md">
            <FaMoneyBillTransfer size={30} />
          </div>
          <div className="flex flex-col justify-around bg-blue-50">
            {iconso.edit}
            {iconso.trash}
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1">{box.id}</h3>
      <p className="text-gray-600">{box.description}</p>
    </div>
  )
}

export default CardItem
