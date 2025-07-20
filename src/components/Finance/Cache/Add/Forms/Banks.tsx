import Input from '@/components/hub/Forms/Input'
import { FaPlus } from 'react-icons/fa'
type BankAccount = {
  bankName: string
  accountNumber: string
  cardNumber: string
  iban: string
}

type BankAccountsProps = {
  bankAccounts: BankAccount[]
  setBankAccounts: (data: BankAccount[]) => void
}

const bankLabels: Record<keyof BankAccount, string> = {
  bankName: 'نام بانک',
  accountNumber: 'شماره حساب',
  cardNumber: 'شماره کارت',
  iban: 'شماره شبا',
}

const BankAccounts = ({ bankAccounts, setBankAccounts }: BankAccountsProps) => {
  const handleChange = (
    index: number,
    key: keyof BankAccount,
    value: string
  ) => {
    const updated = [...bankAccounts]
    updated[index][key] = value
    setBankAccounts(updated)
  }

  const handleAdd = () => {
    setBankAccounts([
      ...bankAccounts,
      { bankName: '', accountNumber: '', cardNumber: '', iban: '' },
    ])
  }

  return (
    <div className='flex flex-col gap-6'>
      {bankAccounts.map((account, index) => (
        <div
          key={index}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-xl shadow-sm'
        >
          {Object.keys(account).map((key) => (
            <Input
              key={key}
              label={bankLabels[key as keyof BankAccount]}
              value={account[key as keyof BankAccount]}
              onChange={(value) =>
                handleChange(index, key as keyof BankAccount, value)
              }
            />
          ))}
        </div>
      ))}

      <button
        type='button'
        onClick={handleAdd}
        className='mt-2 self-start text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition'
      >
        <FaPlus /> افزودن حساب بانکی جدید
      </button>
    </div>
  )
}

export default BankAccounts
