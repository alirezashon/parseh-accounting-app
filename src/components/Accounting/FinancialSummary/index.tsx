'use client'

import { useState } from 'react'
import FormHead from '@/components/Headers/FormHead'
import EditableTable from '../hub/DetailedBlankTable'
import { IoMdCloseCircle } from 'react-icons/io'
import { tableData } from './Accountable/lib'
import Accountable from './Accountable'
import { BiCheckCircle } from 'react-icons/bi'

const FinancialSummary: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [modalColor, setModalColor] = useState<string>('#2F27CE')

  const handleRowClick = (name: string, color: string) => {
    setSelectedRow(name)
    setModalColor(color)
  }

  return (
    <div className=' absolute  right-[7%] max-sm:right-0'>
      <FormHead formName='تراز افتتاحیه' />
      <div className='w-[100vw] max-w-7xl max-w-sm:w-full min-h-[80vh]  bg-white border border-[#dbeafe] rounded-b-2xl px-12 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 xl:grid-cols-3 m-7'>
          {tableData.map((section) => (
            <Accountable
              key={section.title}
              title={section.title}
              rows={section.rows}
              color={section.color}
              onRowClick={handleRowClick}
            />
          ))}
        </div>
      </div>
      {selectedRow && (
        <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center pt-10 max-md:pt-2'>
          <div
            className='bg-white rounded-2xl shadow-2xl max-w-[80%] max-md:max-w-[95%] max-sm:w-full w-full h-11/12 p-6 max-md:p1 relative animate-fade-in border'
            style={{ borderColor: modalColor }}
          >
            <div className='flex justify-between items-center border-b border-blue-400 mb-5 w-full '>
              <h2
                className='text-xl font-bold text-center mb-4  '
                style={{ color: modalColor }}
              >
                {selectedRow}
              </h2>
              <IoMdCloseCircle
                className=' cursor-pointer text-red-500 hover:text-black transition text-xl flex '
                onClick={() => setSelectedRow(null)}
                aria-label='Close modal'
                size={34}
              />
            </div>
            <EditableTable
              rows={[
                {
                  id: 1,
                  person: 'علی',
                  currency: 'USD',
                  currencyAmount: '100',
                  amountIRR: '5000000',
                },
                {
                  id: 12,
                  person: 'علی',
                  currency: 'USD',
                  currencyAmount: '100',
                  amountIRR: '5000000',
                },
                {
                  id: 13,
                  person: 'علی',
                  currency: 'USD',
                  currencyAmount: '100',
                  amountIRR: '5000000',
                },
                {
                  id: 14,
                  person: 'علی',
                  currency: 'USD',
                  currencyAmount: '100',
                  amountIRR: '5000000',
                },
                {
                  id: 15,
                  person: 'علی',
                  currency: 'USD',
                  currencyAmount: '100',
                  amountIRR: '5000000',
                },
              ]}
              fields={[
                { key: 'person', label: 'شخص', type: 'text' },
                { key: 'currency', label: 'واحد پول', type: 'text' },
                { key: 'currencyAmount', label: 'مبلغ ارزی', type: 'number' },
                { key: 'amountIRR', label: 'مبلغ (IRR)', type: 'number' },
              ]}
              onRowClick={(row) => console.log(row)}
              color={modalColor}
            />
            <p className='flex justify-self-end px-5 py-1 mt-20 cursor-pointer bg-[#2F27CE] items-center gap-7 text-2xl m-4 rounded-md text-white'>
              <span>ثبت</span>
              <BiCheckCircle size={34} />
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FinancialSummary
