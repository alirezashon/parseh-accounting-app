'use client'

import FormHead from '@/components/Headers/FormHead'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import { useState } from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa6'

const headerFields = [
  { key: 'code', label: 'شماره سند', type: 'text' },
  { key: 'date', label: 'تاریخ', type: 'date' },
  {
    key: 'project',
    label: 'پروژه',
    type: 'select',
    options: ['پروژه ۱', 'پروژه ۲'],
  },
  { key: 'description', label: 'توضیحات', type: 'textarea' },
]

interface DocumentRow {
  account: string
  detailed: string
  description: string
  debit: number
}

export default function AddDocument() {
  const [formHeader, setFormHeader] = useState(
    Object.fromEntries(
      headerFields.map(({ key, type }) => [
        key,
        type === 'date' ? new Date().toISOString().split('T')[0] : '',
      ])
    )
  )

  const [documents, setDocuments] = useState<DocumentRow[]>([
    { account: '', detailed: '', description: '', debit: 0 },
  ])

  const renderHeaderInput = ({ key, label, type, options = [] }: any) => {
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
            items={options.map((o: string, i: number) => ({ id: i, label: o }))}
            setSelectedItems={(id) => update(options[id])}
          />
        )
      default:
        return null
    }
  }

  const updateRow = (
    index: number,
    field: keyof DocumentRow,
    value: string | number
  ) => {
    setDocuments((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    )
  }

  const deleteRow = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const addNewRow = () => {
    setDocuments((prev) => [
      ...prev,
      { account: '', detailed: '', description: '', debit: 0 },
    ])
  }

  return (
    <div className='space-y-6'>
      {/* <FormHead formName='ایجاد سند' /> */}
      <Divider title='مشخصات سربرگ سند' />
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
        {headerFields.map((field, i) => (
          <div key={i}>{renderHeaderInput(field)}</div>
        ))}
      </div>
      <Divider title='سطرهای سند' />
      <div className='flex'>
        <div className='flex flex-wrap items-end  p-4  rounded-xl shadow-sm bg-blue-50/50 hover:shadow-md transition-all'>
          {documents.map((row, index) => (
            <div
              key={index}
              className='flex flex-wrap items-end   rounded-xl  hover:shadow-md transition-all'
            >
              <div className='min-w-[200px] flex-1'>
                <MultiSelectTrees
                  trees={treeData}
                  placeholder='انتخاب حساب‌ها'
                  onSelect={(ids) => console.log('انتخاب‌شده‌ها:', ids)}
                />
              </div>
              <div className='min-w-[200px] flex-1'>
                <Input
                  label={index === 0 ? 'شرح' : ''}
                  placeholder='شرح'
                  value={row.description}
                  onChange={(val) => updateRow(index, 'description', val)}
                  className='rounded-0'
                />
              </div>
              <div className='w-32'>
                <InputNumber
                  label={index === 0 ? 'بدهکار' : ''}
                  placeholder='بدهکار'
                  type='number'
                  value={row.debit}
                  onChange={(val) => updateRow(index, 'debit', val)}
                />
              </div>
              <div className='w-32'>
                <InputNumber
                  label={index === 0 ? 'بستانکار' : ''}
                  placeholder='بستانکار'
                  type='number'
                  value={row.debit}
                  onChange={(val) => updateRow(index, 'debit', val)}
                />
              </div>
              <div className='min-w-[200px] flex-1'>
                <MultiSelectTrees
                  trees={treeData}
                  placeholder='انتخاب حساب‌ها'
                  onSelect={(ids) => console.log('انتخاب‌شده‌ها:', ids)}
                />
              </div>
              <div className='min-w-[200px] flex-1'>
                <Input
                  label={index === 0 ? 'شرح' : ''}
                  placeholder='شرح'
                  value={row.description}
                  onChange={(val) => updateRow(index, 'description', val)}
                  className='rounded-0'
                />
              </div>
              <div className='ml-auto mt-1'>
                <button onClick={() => deleteRow(index)}>
                  <FaTrash
                    className='text-red-600 hover:scale-125 hover:rotate-45 transition-all duration-300'
                    size={20}
                  />
                </button>
              </div>
            </div>
          ))}

          <div
            onClick={addNewRow}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all'
          >
            <FaPlus />
            افزودن سطر جدید
          </div>
        </div>
      </div>
    </div>
  )
}

const treeData = [
  {
    id: '1',
    label: 'دارایی ها',
    children: [
      { id: 2, label: 'دارایی های جاری' },
      { id: 25, label: 'دارایی های غیر جاری' },
    ],
  },
  {
    id: '40',
    label: 'بدهی ها',
    children: [
      { id: 41, label: 'بدهیهای جاری' },
      { id: 57, label: 'بدهیهای غیر جاری' },
    ],
  },
  {
    id: '63',
    label: 'حقوق صاحبان سهام',
    children: [{ id: 64, label: 'حقوق صاحبان سهام' }],
  },
  {
    id: '71',
    label: 'خرید',
    children: [
      { id: 72, label: 'خرید کالا' },
      { id: 73, label: 'برگشت از خرید' },
      { id: 74, label: 'تخفیفات نقدی خرید' },
    ],
  },
  {
    id: '75',
    label: 'فروش',
    children: [
      { id: 76, label: 'فروش کالا' },
      { id: 77, label: 'برگشت از فروش' },
      { id: 78, label: 'تخفیفات نقدی فروش' },
    ],
  },
  {
    id: '79',
    label: 'درآمد',
    children: [
      { id: 80, label: 'درآمد های عملیاتی' },
      { id: 85, label: 'درآمد های غیر عملیاتی' },
    ],
  },
  {
    id: '91',
    label: 'هزینه ها',
    children: [
      { id: 92, label: 'هزینه های پرسنلی' },
      { id: 111, label: 'هزینه های عملیاتی' },
      { id: 123, label: 'هزینه های استهلاک' },
      { id: 127, label: 'هزینه های بازاریابی و توزیع و فروش' },
      { id: 131, label: 'هزینه های غیرعملیاتی' },
    ],
  },
  {
    id: '138',
    label: 'سایر حساب ها',
    children: [
      { id: 139, label: 'حساب های انتظامی' },
      { id: 142, label: 'حساب های کنترلی' },
      { id: 144, label: 'حساب خلاصه سود و زیان' },
    ],
  },
]

const testItems = [
  { id: 1, value: 'دارایی ها' },
  { id: 2, value: 'دارایی های جاری' },
  { id: 25, value: 'دارایی های غیر جاری' },
  { id: 40, value: 'بدهی ها' },
  { id: 41, value: 'بدهیهای جاری' },
  { id: 57, value: 'بدهیهای غیر جاری' },
  { id: 63, value: 'حقوق صاحبان سهام' },
  { id: 64, value: 'حقوق صاحبان سهام' },
  { id: 71, value: 'خرید' },
  { id: 72, value: 'خرید کالا' },
  { id: 73, value: 'برگشت از خرید' },
  { id: 74, value: 'تخفیفات نقدی خرید' },
  { id: 75, value: 'فروش' },
  { id: 76, value: 'فروش کالا' },
  { id: 77, value: 'برگشت از فروش' },
  { id: 78, value: 'تخفیفات نقدی فروش' },
  { id: 79, value: 'درآمد' },
  { id: 80, value: 'درآمد های عملیاتی' },
  { id: 85, value: 'درآمد های غیر عملیاتی' },
  { id: 91, value: 'هزینه ها' },
  { id: 92, value: 'هزینه های پرسنلی' },
  { id: 111, value: 'هزینه های عملیاتی' },
  { id: 123, value: 'هزینه های استهلاک' },
  { id: 127, value: 'هزینه های بازاریابی و توزیع و فروش' },
  { id: 131, value: 'هزینه های غیرعملیاتی' },
  { id: 138, value: 'سایر حساب ها' },
  { id: 139, value: 'حساب های انتظامی' },
  { id: 142, value: 'حساب های کنترلی' },
  { id: 144, value: 'حساب خلاصه سود و زیان' },
]
