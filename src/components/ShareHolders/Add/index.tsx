'use client'

import Input from '@/components/hub/Forms/Input'
import { useState } from 'react'
import { FaTrash, FaPlus, FaUser } from 'react-icons/fa'

type Shareholder = {
  id: number
  name: string
  percentage: number
}

const AddShareholders = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { id: 1, name: '', percentage: 0 },
  ])

  const handleAdd = () => {
    const newItem: Shareholder = {
      id: Date.now(),
      name: '',
      percentage: 0,
    }
    setShareholders([...shareholders, newItem])
  }

  const handleDelete = (id: number) => {
    setShareholders(shareholders.filter((item) => item.id !== id))
  }

  const handleChange = (
    id: number,
    field: keyof Shareholder,
    value: string | number
  ) => {
    setShareholders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const total = shareholders.reduce(
    (acc, item) => acc + Number(item.percentage || 0),
    0
  )

  return (
    <div className='space-y-6 bg-white p-8 shadow-2xl shadow-blue-300'>
      <div className='flex items-center justify-between border-b pb-2'>
        <h2 className='text-xl font-semibold text-blue-700 flex items-center gap-2'>
          <FaUser className='text-blue-500' />
          سهامداران
        </h2>
        <button
          className='flex items-center gap-2 text-[#2f27ce]'
          onClick={handleAdd}
        >
          <FaPlus className='' />
          <p>افزودن</p>
        </button>
      </div>

      <div className='grid gap-4'>
        {shareholders.map((item, index) => (
        <div
        key={item.id}
        className={`flex flex-wrap items-end gap-3 p-4 border rounded-xl shadow-sm 
          bg-blue-50/50 hover:shadow-md transition-all`}
      >
        <div className='flex-1 min-w-[200px]'>
          <Input
            label='نام سهامدار'
            value={item.name}
            onChange={(val) => handleChange(item.id, 'name', val)}
            placeholder='مثلاً: علی احمدی'
          />
        </div>
        <div className='w-32 min-w-[100px]'>
          <Input
            label='درصد'
            value={item.percentage.toString()}
            onChange={(val) => handleChange(item.id, 'percentage', Number(val))}
            placeholder='درصد سهام'
          />
        </div>
        <div className='ml-auto mt-1 md:mt-0'>
          <button onClick={() => handleDelete(item.id)}>
            <FaTrash className='text-red-600' size={24} />
          </button>
        </div>
      </div>
      
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800 font-medium border-t pt-4'>
        <div>تعداد سهامداران: {shareholders.length}</div>
        <div>مجموع درصد: {total}%</div>
      </div>
    </div>
  )
}

export default AddShareholders
