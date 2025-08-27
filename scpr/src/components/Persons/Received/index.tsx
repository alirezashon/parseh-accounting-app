'use client'

import MainHead from '@/components/Headers/MainHead'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import ComponentSearchable from '@/components/hub/Forms/types/Inputs/ComponentSearchable'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import { dummyPeople } from '@/components/ShareHolders/Add'
import { useState } from 'react'
import { DiDatabase } from 'react-icons/di'
import { FaTrash, FaPlus } from 'react-icons/fa6'
import { RiUserAddFill } from 'react-icons/ri'

const currencies = ['ریال ایران - IRR', 'دلار آمریکا - USD']
const paymentMethods = ['نقدی', 'کارت به کارت', 'چک']

const headerFields = [
  { key: 'number', label: 'شماره سند', type: 'text' },
  { key: 'date', label: 'تاریخ', type: 'date' },
  { key: 'project', label: 'پروژه', type: 'select', options: ['پروژه ۱', 'پروژه ۲'] },
  { key: 'currency', label: 'واحد پول', type: 'select', options: currencies },
  { key: 'description', label: 'توضیحات', type: 'textarea' },
]

interface Payment {
  person: string
  amount: number
  description: string
  paymentMethod: string
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

  const [shareholders, setShareholders] = useState<Payment[]>([
    { person: '', amount: 0, description: '', paymentMethod: '' },
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

  const handleDelete = (index: number) => {
    setShareholders(shareholders.filter((_, i) => i !== index))
  }

  const handleChange = (
    index: number,
    field: keyof Payment,
    value: string | number
  ) => {
    setShareholders((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    )
  }

  const addNewPerson = () => {
    setShareholders([...shareholders, { person: '', amount: 0, description: '', paymentMethod: '' }])
  }

  return (
    <div>
      <MainHead
        title="دریافت"
        icons={[
          { icon: <DiDatabase className="text-2xl" />, label: 'لیست اشخاص', destination: '/persons' },
          { icon: <RiUserAddFill className="text-2xl" />, label: 'ایجاد شخص', destination: '/persons/add' },
          { label: 'دریافت از شخص', icon: <RiUserAddFill className="text-2xl" />, destination: '/persons/received' },
        ]}
      />

      <Divider title="مشخصات سربرگ سند" />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {headerFields.map((field, i) => (
          <div key={i}>{renderInput(field)}</div>
        ))}
      </div>

      <Divider title="مشخصات دریافت‌کنندگان" />

      <div className="grid gap-4">
        {shareholders.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap items-end gap-4 p-4 border border-blue-400 rounded-xl shadow-sm bg-blue-50 hover:shadow-md transition-all"
          >
            <div className="flex-1 min-w-[200px]">
              <ComponentSearchable
                value={item.person}
                onChange={(val) => handleChange(index, 'person', val)}
                onSelect={(id) => handleChange(index, 'person', dummyPeople.find((p) => p.id === id)?.name || '')}
                placeholder="جستجو در لیست افراد..."
                label="انتخاب شخص"
                // className="border border-blue-500 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="w-32">
              <InputNumber
                label="مبلغ"
                type="number"
                value={item.amount}
                onChange={(val) => handleChange(index, 'amount', val)}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Input
                label="بابت"
                value={item.description}
                onChange={(val) => handleChange(index, 'description', val)}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <SingleSelectList
                label="روش پرداخت"
                items={paymentMethods.map((o, i) => ({ id: i, label: o }))}
                setSelectedItems={(id) => handleChange(index, 'paymentMethod', paymentMethods[id as number])}
              />
            </div>
            <div className="ml-auto">
              <button onClick={() => handleDelete(index)}>
                <FaTrash className="text-red-600 hover:scale-125 transition-transform" size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={addNewPerson}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus /> افزودن شخص
        </button>
      </div>
    </div>
  )
}
