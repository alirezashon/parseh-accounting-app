// import { FaMoneyBillTransfer } from 'react-icons/fa6'

// export interface ImprestInterface {
//   id: number
//   name: string
//   balance: string
//   currency: string
//   description: string
// }

// const CardItem = ({
//   box,
//   onClick,
// }: {
//   box: ImprestInterface
//   onClick: () => void
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white/90 backdrop-blur-sm rounded-xl select-none shadow-lg p-6 flex flex-col items-center
//                  border-[1vh] border-dashed border-x-blue-400 border-y-blue-100 cursor-pointer animate-fadeIn
//                  hover:shadow-2xl hover:scale-105 transition-all duration-300"
//     >
//       <div className="bg-[#2f27ce] text-white p-5 rounded-full mb-4 shadow-md">
//         <FaMoneyBillTransfer size={30} />
//       </div>
//       <h3 className="text-lg font-semibold mb-1">{box.name}</h3>
//       <p className="text-gray-600">
//         {box.balance} {box.currency}
//       </p>
//     </div>
//   )
// }
// export default CardItem
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { useRef } from 'react'

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
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-12 py-3 flex flex-col items-center 
                 border-[4px]  border-dashed border-x-blue-400 border-y-blue-100 animate-fadeIn 
                 hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      <div className="bg-[#2f27ce] text-white p-5 rounded-full mb-4 shadow-md">
        <FaMoneyBillTransfer size={30} />
      </div>
      <h3 className="text-lg font-semibold mb-1">{box.name}</h3>
      <p className="text-gray-600">
        {box.balance} {box.currency}
      </p>
    </div>
  )
}

export default CardItem
