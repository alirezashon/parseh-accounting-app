'use client'
import { useState } from 'react'
import {
  FaPlus,
  FaTrashAlt,
  FaUser,
  FaWallet,
  FaUniversity,
  FaMoneyCheck,
  FaBook,
  FaUserTie,
} from 'react-icons/fa'
import { MdOutlineAttachMoney } from 'react-icons/md'

const currencies = ['ریال ایران - IRR', 'دلار آمریکا - USD']

type SourceType = 'صندوق' | 'بانک' | 'چک' | 'حساب' | 'شخص' | 'تنخواه گردان'

interface Item {
  id: number
  person: string
  amount: string
  description: string
  fee: string
  sourceType: SourceType
  sourceDetails: string
}

export default function ReceiveMoneyPage() {
  const [items, setItems] = useState<Item[]>([])
  const [nextId, setNextId] = useState(1)

  const [formHeader, setFormHeader] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    project: '',
    currency: currencies[0],
    description: '',
  })

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        person: '',
        amount: '',
        description: '',
        fee: '',
        sourceType: 'صندوق',
        sourceDetails: '',
      },
    ])
    setNextId((id) => id + 1)
  }

  const updateItem = (id: number, key: keyof Item, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.amount || 0) + Number(item.fee || 0),
    0
  )

  const renderIcon = (type: SourceType) => {
    switch (type) {
      case 'صندوق':
        return <FaWallet className='inline mr-1' />
      case 'بانک':
        return <FaUniversity className='inline mr-1' />
      case 'چک':
        return <FaMoneyCheck className='inline mr-1' />
      case 'حساب':
        return <FaBook className='inline mr-1' />
      case 'شخص':
        return <FaUserTie className='inline mr-1' />
      case 'تنخواه گردان':
        return <FaUser className='inline mr-1' />
      default:
        return null
    }
  }

  return (
    <div className='bg-white p-6 rounded-2xl shadow-xl max-w-5xl mx-auto space-y-6'>
      <div className="text-center text-2xl font-bold text-indigo-600">
        یکیدونه‌ی دل من
        <div className="text-purple-700 text-xl font-light">ماه خوشجیله من 💜</div>
      </div>

      {/* Header */}
      <div className='grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4'>
        <div>
          <label className='text-sm font-medium'>شماره</label>
          <input
            value={formHeader.number}
            onChange={(e) =>
              setFormHeader({ ...formHeader, number: e.target.value })
            }
            className='w-full border rounded-lg px-3 py-2'
            placeholder='شماره سند'
          />
        </div>
        <div>
          <label className='text-sm font-medium'>تاریخ</label>
          <input
            type='date'
            value={formHeader.date}
            onChange={(e) =>
              setFormHeader({ ...formHeader, date: e.target.value })
            }
            className='w-full border rounded-lg px-3 py-2'
          />
        </div>
        <div>
          <label className='text-sm font-medium'>پروژه</label>
          <select
            value={formHeader.project}
            onChange={(e) =>
              setFormHeader({ ...formHeader, project: e.target.value })
            }
            className='w-full border rounded-lg px-3 py-2'
          >
            <option>انتخاب کنید</option>
          </select>
        </div>
        <div>
          <label className='text-sm font-medium'>واحد پول</label>
          <select
            value={formHeader.currency}
            onChange={(e) =>
              setFormHeader({ ...formHeader, currency: e.target.value })
            }
            className='w-full border rounded-lg px-3 py-2'
          >
            {currencies.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-sm font-medium'>شرح</label>
          <input
            value={formHeader.description}
            onChange={(e) =>
              setFormHeader({ ...formHeader, description: e.target.value })
            }
            className='w-full border rounded-lg px-3 py-2'
            placeholder='توضیحات'
          />
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={addItem}
        className='bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg flex items-center gap-2'
      >
        <FaPlus />
        افزودن دریافت
      </button>

      {/* Item List */}
      <div className='space-y-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-4 items-center bg-indigo-50 border border-indigo-100 rounded-xl p-4 relative'
          >
            <button
              onClick={() => removeItem(item.id)}
              className='absolute top-2 left-2 text-red-500 hover:text-red-600'
              title='حذف'
            >
              <FaTrashAlt />
            </button>

            <div>
              <label className='text-xs'>شخص</label>
              <input
                value={item.person}
                onChange={(e) => updateItem(item.id, 'person', e.target.value)}
                placeholder='شخص'
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>

            <div>
              <label className='text-xs'>مبلغ</label>
              <input
                value={item.amount}
                onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                placeholder='مبلغ'
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>

            <div>
              <label className='text-xs'>شرح</label>
              <input
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, 'description', e.target.value)
                }
                placeholder='شرح'
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>

            <div>
              <label className='text-xs'>کارمزد خدمات بانکی</label>
              <input
                value={item.fee}
                onChange={(e) => updateItem(item.id, 'fee', e.target.value)}
                placeholder='کارمزد'
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>

            <div>
              <label className='text-xs'>نوع منبع</label>
              <select
                value={item.sourceType}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    'sourceType',
                    e.target.value as SourceType
                  )
                }
                className='w-full border rounded-lg px-3 py-2'
              >
                <option value='صندوق'>🏦 صندوق</option>
                <option value='بانک'>🏛️ بانک</option>
                <option value='چک'>🧾 چک</option>
                <option value='حساب'>📘 حساب</option>
                <option value='شخص'>👤 شخص</option>
                <option value='تنخواه گردان'>👜 تنخواه گردان</option>
              </select>
            </div>

            <div>
              <label className='text-xs'>جزئیات منبع</label>
              <input
                value={item.sourceDetails}
                onChange={(e) =>
                  updateItem(item.id, 'sourceDetails', e.target.value)
                }
                placeholder='مثلاً شماره حساب یا چک'
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      {items.length > 0 && (
        <div className='border-t pt-4 text-right space-y-2'>
          <div className='text-green-700 font-semibold'>
            <MdOutlineAttachMoney className='inline' /> مجموع:{' '}
            {total.toLocaleString()} ریال
          </div>
          <div className='text-red-600 font-semibold'>
            باقی‌مانده: {(1000000 - total).toLocaleString()} ریال
          </div>
        </div>
      )}
    </div>
  )
}
