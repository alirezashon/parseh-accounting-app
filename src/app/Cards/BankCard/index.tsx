import React from 'react'
import Image from 'next/image'
import { bankCardImage } from '../MatchingBankCards'
import { BiCopy } from 'react-icons/bi'

type BankCardProps = {
  sheba: string
  dateTime: string
  balance: string
  bankCode: string
}
const whiteText = ['055', '011', '012', '017', '057', '015']
const whiteButton = ['011', '012', '057']
const firstLineMargin = ['013','066','012']
const BankCard: React.FC<BankCardProps> = ({
  sheba,
  dateTime,
  balance,
  bankCode,
}) => {
  return (
    <div className='relative w-[320px] h-[179px] flex-shrink-0'>
      <Image
        src={bankCardImage[bankCode] || ''}
        width={320}
        height={179}
        alt='saman'
        className='rounded-lg h-fit'
      />
      <div
        className={`w-full absolute flex flex-col gap-4 bottom-4 px-3 ${
          whiteText.includes(bankCode) && 'text-white'
        } ${firstLineMargin.includes(bankCode)&& ' bottom-3'}`}>
        <div className={`flex justify-between w-full `}>
          <BiCopy
            size={24}
            color={whiteText.includes(bankCode) ? '#fff' : '#2F27CE'}
          />
          <span>{sheba}</span>
        </div>
        <div className='flex justify-between w-full '>
          <span>{balance}</span>
          <span>: موجودی قابل برداشت </span>
        </div>
        <div className='flex justify-between w-full '>
          <button className={`h-7 w-[110px] ${whiteButton.includes(bankCode)?  'bg-white text-[#2F27CE] rounded-lg hover:bg-blue-100': 'bg-[#2F27CE] text-white rounded-lg hover:bg-blue-800'}`}>
            به روزرسانی
          </button>
          <div className='flex'>
            <span>{dateTime}</span>
            <span> : آخرین به روزرسانی</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankCard
