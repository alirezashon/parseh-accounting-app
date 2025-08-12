import { FaMoneyBillTransfer } from "react-icons/fa6"

export interface ImprestInterface {
  id: number
  name: string
  balance: string
  currency: string
  description: string
}

const CardItem = ({
  box,
  onClick,
}: {
  box: ImprestInterface
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col items-center 
                 border border-gray-100 cursor-pointer animate-fadeIn 
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