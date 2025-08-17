'use client'
import MainHead from '@/components/Headers/MainHead'
import Calendar from '@/components/hub/Calendar'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import { Detail, Header } from '@/interfaces'
import { useState } from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa6'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'

const headerFields = [
  { key: 'code', label: 'شماره سند', type: 'text' },
    { key: '', label: 'شماره سند', type: 'text' },
  { key: 'date', label: 'تاریخ', type: 'date' },
  // {
  //   key: 'project',
  //   label: 'پروژه',
  //   type: 'select',
  //   options: ['پروژه ۱', 'پروژه ۲'],
  // },
  { key: 'description', label: 'توضیحات', type: 'textarea' },
]

interface DocumentRow {
  account: string
  detailed: string
  description: string
  debit: number
  credit: number
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
  const [formData, setFormData] = useState<{
    header: Header
    details: Detail[]
  }>({
    header: {
      BranchRef: 0,
      Date: new Date().toISOString().split('T')[0],
      VoucherTypeRef: 0,
      IsCurrencyBased: 0,
      Description: '',
      Description_En: '',
      State: 0,
      IsTemporary: 0,
      IsExternal: 0,
      ReferenceNumber: 0,
      ShowCurrencyFields: 0,
      IsReadonly: 0,
      FiscalYearRef: 0,
      Signature: '',
    },
    details: [
      {
        RowNumber: 1,
        AccountGroupRef: 0,
        GLRef: 0,
        SLRef: 0,
        SLCode: '',
        Debit: 0,
        Credit: 0,
        Description: '',
        Description_En: '',
        FollowUpNumber: '',
        FollowUpDate: '',
        Quantity: 0,
        DLLevel4: '',
        DLLevel5: '',
        DLTypeRef4: 0,
        DLTypeRef5: 0,
        CurrencyRef: 0,
        TaxAccountType: 0,
        TaxStateType: 0,
        TransactionType: 0,
        PurchaseOrSale: 0,
        ItemOrService: 0,
        PartyRef: 0,
        TaxAmount: 0,
      },
    ],
  })
  const [documents, setDocuments] = useState<DocumentRow[]>([
    { account: '', detailed: '', description: '', debit: 0, credit: 0 },
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
      { account: '', detailed: '', description: '', debit: 0, credit: 0 },
    ])
  }
  const handleSubmit = () => {
    const mappedDetails: Detail[] = documents.map((row, index) => ({
      RowNumber: index + 1,
      AccountGroupRef: 0,
      GLRef: parseInt(row.account) || 0,
      SLRef: parseInt(row.detailed) || 0,
      SLCode: '',
      Debit: row.debit || 0,
      Credit: row.credit || 0,
      Description: row.description,
      Description_En: '',
      FollowUpNumber: '',
      FollowUpDate: '',
      Quantity: 0,
      DLLevel4: '',
      DLLevel5: '',
      DLTypeRef4: 0,
      DLTypeRef5: 0,
      CurrencyRef: 0,
      TaxAccountType: 0,
      TaxStateType: 0,
      TransactionType: 0,
      PurchaseOrSale: 0,
      ItemOrService: 0,
      PartyRef: 0,
      TaxAmount: 0,
    }))

    const fullData: { header: Header; details: Detail[] } = {
      header: {
        ...formData.header,
        Description: formHeader.description,
        Date: formHeader.date,
        ReferenceNumber: Number(formHeader.code),
      },
      details: mappedDetails,
    }

    console.log('🔄 Sending Document:', fullData)
    // اینجا بفرست به API...
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
      <div className="flex flex-col overflow-x-auto">
        {documents.map((row, index) => (
          <div
            key={index}
            className="flex items-center  w-full "
          >
            <div className="min-w-[200px] flex-1 hover:shadow-md transition-all ">
              <MultiSelectTrees
                trees={treeData}
                placeholder="کد معین"
                label={index === 0 ? 'کد معین' : ''}
                onSelect={(ids) => console.log('انتخاب‌شده‌ها:', ids)}
              />
            </div>
            <div className="min-w-[200px] flex-1">
              <MultiSelectTrees
                trees={treeData}
                placeholder="کد تفضیلی"
                label={index === 0 ? 'کد تفضیلی' : ''}
                onSelect={(ids) => console.log('انتخاب‌شده‌ها:', ids)}
              />
            </div>
            <div className="min-w-[200px] flex-1">
              <InputNumber
                label={index === 0 ? 'بدهکار' : ''}
                placeholder="بدهکار"
                 value={row.debit}
                onChange={(val) => updateRow(index, 'debit', val)}
              />
            </div>
            <div className="min-w-[200px] flex-1">
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
            <div className="flex-1 min-w-[200px]">
              <Input
              className='rounded-0'
                label={index === 0 ? 'شماره پیگیری' : ''}
                placeholder="شماره پیگیری"
                value={row.description}
                onChange={(val) => updateRow(index, 'description', val)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Calendar
                setDate={() => ''}
                placeholder="تاریخ پیگیری"
                label={index === 0 ? 'تاریخ پیگیری' : ''}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <SingleSelectList
                label={index === 0 ? 'مرکز هزینه / پروژه' : ''}
                items={[{ id: 'i', label: ' o' }]}
                setSelectedItems={(id) => id}
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
        <div className="flex items-center">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all self-start"
          >
            ثبت سند حسابداری
          </button>
          <button
            onClick={addNewRow}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all self-start"
          >
            <FaPlus />
            افزودن سطر جدید
          </button>
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
