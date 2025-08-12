'use client'
import MainHead from '@/components/Headers/MainHead'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import { useState } from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa6'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'

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
    <div className="space-y-8">
      <MainHead
        title="ایجاد سند"
        icons={[
          {
            icon: <HiDocumentPlus size={28} />,
            label: 'سند جدید',
            destination: '/accounting/add',
          },
          {
            icon: <MdCategory size={28} />,
            label: 'جدول حساب‌ها',
            destination: '/accounting/acctypes',
          },
          {
            icon: <HiClipboardDocumentList size={28} />,
            label: 'لیست اسناد',
            destination: '/accounting',
          },
        ]}
      />

      {/* مشخصات سربرگ */}
      <Divider title="مشخصات سربرگ سند" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {headerFields.map((field, i) => (
          <div key={i}>{renderHeaderInput(field)}</div>
        ))}
      </div>

      {/* سطرهای سند */}
      <Divider title="سطرهای سند" />
      <div className="flex flex-col gap-4">
        {documents.map((row, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all flex flex-wrap gap-4 items-end"
          >
            <div className="min-w-[200px] flex-1">
              <MultiSelectTrees
                trees={treeData}
                placeholder="انتخاب حساب‌ها"
                onSelect={(ids) => console.log('انتخاب‌شده‌ها:', ids)}
              />
            </div>
            <div className="w-32">
              <InputNumber
                label={index === 0 ? 'بدهکار' : ''}
                placeholder="بدهکار"
                type="number"
                value={row.debit}
                onChange={(val) => updateRow(index, 'debit', val)}
              />
            </div>
            <div className="w-32">
              <InputNumber
                label={index === 0 ? 'بستانکار' : ''}
                placeholder="بستانکار"
                type="number"
                value={row.debit}
                onChange={(val) => updateRow(index, 'debit', val)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label={index === 0 ? 'شرح' : ''}
                placeholder="شرح"
                value={row.description}
                onChange={(val) => updateRow(index, 'description', val)}
              />
            </div>
            <button
              onClick={() => deleteRow(index)}
              className="ml-auto text-red-600 hover:text-red-800 hover:scale-110 transition-all"
            >
              <FaTrash size={18} />
            </button>
          </div>
        ))}

        {/* دکمه افزودن */}
        <button
          onClick={addNewRow}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all self-start"
        >
          <FaPlus />
          افزودن سطر جدید
        </button>
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
