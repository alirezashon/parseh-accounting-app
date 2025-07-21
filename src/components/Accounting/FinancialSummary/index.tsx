'use client'

import { useState } from 'react'
import FormHead from '@/components/Headers/FormHead'
import DetailedBankTable from '../hub/DetailedBlankTable'

type RowItem = {
  name: string
  amount: string
}

type TableRow = {
  id: number
  person: string
  currency: string
  currencyAmount: string
  amountIRR: string
}

type Section = {
  title: string
  color: string
  rows: RowItem[]
}

const tableData: Section[] = [
  {
    title: 'دارایی ها',
    color: '#27CE80',
    rows: [
      { name: 'بانک', amount: 'ریال ۰' },
      { name: 'صندوق', amount: 'ریال ۰' },
      { name: 'تنخواه گردان', amount: 'ریال ۰' },
      { name: 'موجودی کالا', amount: 'ریال ۰' },
      { name: 'بدهکاران', amount: 'ریال ۰' },
      { name: 'اسناد دریافتنی', amount: 'ریال ۰' },
      { name: 'اسناد در جریان وصول', amount: 'ریال ۰' },
      { name: 'سایر دارائی ها', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
  {
    title: 'بدهی ها',
    color: '#CE2746',
    rows: [
      { name: 'بستانکاران', amount: 'ریال ۰' },
      { name: 'اسناد پرداختنی', amount: 'ریال ۰' },
      { name: 'سایر بدهی ها', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
  {
    title: 'حقوق صاحبان سهام',
    color: '#2F27CE',
    rows: [
      { name: 'سرمایه', amount: '(ریال ۳۴٬۲۳۴)' },
      { name: 'اندوخته قانونی', amount: 'ریال ۳۴٬۲۳۴' },
      { name: 'سود یا زیان انباشته (سنواتی)', amount: 'ریال ۰' },
      { name: 'سایر', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
]

const Table: React.FC<{
  title: string
  rows: RowItem[]
  color: string
  onRowClick: (rowName: string, color: string) => void
}> = ({ title, rows, color, onRowClick }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full overflow-hidden border border-gray-100'>
      <h3
        style={{ backgroundColor: color }}
        className='text-white text-base font-semibold py-3 text-center'
      >
        {title}
      </h3>
      <table className='w-full divide-y divide-gray-100'>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className='group cursor-pointer transition hover:bg-gray-50'
              onClick={() => onRowClick(row.name, color)}
            >
              <td className='px-4 py-2 text-right text-gray-700 group-hover:text-black text-sm'>
                {row.name}
              </td>
              <td className='px-4 py-2 text-left text-gray-600 group-hover:text-black text-sm'>
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FinancialSummary: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [modalColor, setModalColor] = useState<string>('#2F27CE')

  const handleRowClick = (name: string, color: string) => {
    setSelectedRow(name)
    setModalColor(color)
  }

  return (
    <>
      <FormHead />
      <div className='w-full max-w-7xl mx-auto bg-white border border-[#dbeafe] rounded-2xl px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {tableData.map((section) => (
            <Table
              key={section.title}
              title={section.title}
              rows={section.rows}
              color={section.color}
              onRowClick={handleRowClick}
            />
          ))}
        </div>
      </div>

      {/* ✅ مودال نمایش جزئیات */}
      {selectedRow && (
        <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
          <div
            className='bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative animate-fade-in border'
            style={{ borderColor: modalColor }}
          >
            <button
              className='absolute top-3 left-3 text-gray-400 hover:text-black transition text-xl'
              onClick={() => setSelectedRow(null)}
              aria-label='Close modal'
            >
              ✖
            </button>
            <h2
              className='text-xl font-bold text-center mb-4'
              style={{ color: modalColor }}
            >
              {selectedRow}
            </h2>
            <DetailedBankTable
              color={modalColor}
              rows={[
                {
                  id: 1,
                  person: 'علی رضایی',
                  currency: 'USD',
                  currencyAmount: '1000',
                  amountIRR: '500,000,000',
                },
                {
                  id: 2,
                  person: 'شرکت الف',
                  currency: 'EUR',
                  currencyAmount: '800',
                  amountIRR: '400,000,000',
                },

                {
                  id: 3,
                  person: 'حسابدار',
                  currency: 'IRR',
                  currencyAmount: '0',
                  amountIRR: '0',
                },
              ]}
              onRowClick={() => {}}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FinancialSummary
