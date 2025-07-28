'use client'

import FormHead from '@/components/Headers/FormHead'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import ComponentSearchable from '@/components/hub/Forms/types/Inputs/ComponentSearchable'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import { dummyPeople } from '@/components/ShareHolders/Add'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa6'

const currencies = ['ریال ایران - IRR', 'دلار آمریکا - USD']

const headerFields = [
  { key: 'number', label: 'شماره سند', type: 'text' },
  { key: 'date', label: 'تاریخ', type: 'date' },
  {
    key: 'project',
    label: 'پروژه',
    type: 'select',
    options: ['پروژه ۱', 'پروژه ۲'],
  },
  { key: 'currency', label: 'واحد پول', type: 'select', options: currencies },
  { key: 'description', label: 'توضیحات', type: 'textarea' },
]
interface Payment {
  person: string
  amount: number
  description: string
}
export default function ReceiveMoneyPage() {
  const [formHeader, setFormHeader] = useState(
    Object.fromEntries(
      headerFields.map(({ key, type }) => [
        key,
        type === 'date' ? new Date().toISOString().split('T')[0] : '',
      ])
    )
  )
  const [searchText, setSearchText] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [shareholders, setShareholders] = useState<Payment[]>([
    { person: '', amount: 0, description: '' },
  ])
  const renderInput = ({ key, label, type, options = [] }: any) => {
    const value = formHeader[key]
    const update = (val: string) =>
      setFormHeader((prev) => ({ ...prev, [key]: val }))

    switch (type) {
      case 'text':
      case 'date':
        return <Input label={label} value={value} onChange={update} />
      case 'textarea':
        return <TextArea label={label} value={value} onChange={update} />
      case 'select':
        return (
          <SingleSelectList
            label={label}
            items={options.map((o: any, i: number) => ({ id: i, label: o }))}
            setSelectedItems={(id) => update(options[id])}
          />
        )
      default:
        return null
    }
  }
  const handleDelete = (person: string) => {
    setShareholders(shareholders.filter((item) => item.person !== person))
  }

  const handleChange = (
    person: string,
    field: keyof Payment,
    value: string | number
  ) => {
    setShareholders((prev) =>
      prev.map((item) =>
        item.person === person ? { ...item, [field]: value } : item
      )
    )
  }
  return (
    <div>
      <FormHead formName='دریافت' />
      <div className='text-center text-2xl font-bold text-indigo-600'></div>

      <Divider title='مشخصات سربرگ سند' />

      <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
        {headerFields.map((field, i) => (
          <div key={i}>{renderInput(field)}</div>
        ))}
      </div>

      <div className='grid gap-4'>
        {shareholders.map((item, index) => (
          <div
            key={index}
            className={`flex flex-wrap items-end gap-3 p-4 border border-blue-200 rounded-xl shadow-sm 
          bg-blue-50/50 hover:shadow-md transition-all`}
          >
            <div className='w-32 min-w-[100px]'>
              <ComponentSearchable
                value={item.person}
                onChange={(val) => handleChange(item.person, 'person', val)}
                // options={item.person}
                onSelect={(id) => {
                  setSelectedId(id)
                  setSearchText(
                    dummyPeople.find((p) => p.id === id)?.name || ''
                  )
                }}
                placeholder='جستجو در لیست افراد...'
                label='انتخاب شخص'
              />
              <InputNumber
                label='مبلغ'
                type='number'
                value={item.amount}
                onChange={(val) => handleChange(item.person, 'amount', val)}
                placeholder='درصد سهام'
                // inputState='ok'
              />

              {/* <Input
                label='درصد'
                value={item.percentage.toString()}
                onChange={(val) =>
                  handleChange(item.id, 'percentage', Number(val))
                }
                placeholder='درصد سهام'
              /> */}
            </div>
            <div className='ml-auto mt-1 md:mt-0'>
              <button onClick={() => handleDelete(item.person)}>
                <FaTrash
                  className='text-red-600  hover:bg-red-100 hover:scale-125 hover:p-1 hover:rotate-45 transition-all duration-300  rounded-full'
                  size={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
