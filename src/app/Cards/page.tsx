'use client'
import BankCard from './BankCard'
import { bankCardImage } from './MatchingBankCards'
const Cards: React.FC = () => {
  return (
    <div
      className="flex flex-wrap justify-between gap-2 "
      style={{ scrollbarWidth: 'none', direction: 'ltr' }}
    >
      {Object.keys(bankCardImage).map((card, index) => (
        <BankCard
          key={index}
          bankCode={card}
          sheba="IR85 0120 0100 0000 5011 9143 96"
          dateTime="28/2/2012"
          balance="244440444440"
        />
      ))}
    </div>
  )
}
export default Cards
