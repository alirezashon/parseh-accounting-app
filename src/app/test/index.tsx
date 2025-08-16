'use client'

import styles from './BasketCardBox.module.css'

interface CardData {
  id: string
  cardNumber: string
  bankName: string
  owner: string
}

interface BasketCardBoxProps {
  cards: CardData[]
  onChange: (cards: CardData[]) => void
}

const BasketCardBox = ({ cards, onChange }: BasketCardBoxProps) => {
  const removeCard = (id: string) => {
    const newCards = cards.filter((card) => card.id !== id)
    onChange(newCards)
  }

  return (
    <div className={styles.basketBox}>
      {cards.map((card) => (
        <div key={card.id} className={styles.cardItem}>
          <div className={styles.cardTop}>
            <span className={styles.bankName}>{card.bankName}</span>
            <button
              className={styles.removeBtn}
              onClick={() => removeCard(card.id)}
            >
              ×
            </button>
          </div>
          <div className={styles.cardNumber}>{card.cardNumber}</div>
          <div className={styles.owner}>{card.owner}</div>
        </div>
      ))}
    </div>
  )
}

export default BasketCardBox
