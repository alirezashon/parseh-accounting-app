'use client'

import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import { useState } from 'react'

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

export default function ReceiveMoneyPage() {
  const [formHeader, setFormHeader] = useState(
    Object.fromEntries(
      headerFields.map(({ key, type }) => [
        key,
        type === 'date' ? new Date().toISOString().split('T')[0] : '',
      ])
    )
  )

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

  return (
    <div >
      <div className='text-center text-2xl font-bold text-indigo-600'>
       
      </div>

      <Divider title='مشخصات سربرگ سند' />

      <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
        {headerFields.map((field, i) => (
          <div key={i}>{renderInput(field)}</div>
        ))}
      </div>
    </div>
  )
}
