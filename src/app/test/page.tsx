'use client'
import { useState } from 'react'
import BasketCardBox from '.'

const Parent = () => {
  const [cards, setCards] = useState([
    {
      id: '1',
      cardNumber: '6037 9971 2345 6789',
      bankName: 'ملت',
      owner: 'علی احمدی',
    },
    {
      id: '2',
      cardNumber: '5022 2910 9876 1234',
      bankName: 'ملی',
      owner: 'رضا محمدی',
    },
  ])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BasketCardBox cards={cards} onChange={setCards} />
    </div>
  )
}

export default Parent