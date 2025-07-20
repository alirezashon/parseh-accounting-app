'use client'
import Input from '@/components/hub/Forms/Input'
import ComponentSearchable from '@/components/hub/Forms/types/Inputs/ComponentSearchable'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
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
  const [searchText, setSearchText] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

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
  const dummyPeople = [
    {
      id: 1,
      name: 'علیرضا محمدی',
      image: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    {
      id: 2,
      name: 'مریم رضایی',
      image: 'https://randomuser.me/api/portraits/women/21.jpg',
    },
    {
      id: 3,
      name: 'حسین کریمی',
      image: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    {
      id: 4,
      name: 'نگار عسگری',
      image: 'https://randomuser.me/api/portraits/women/41.jpg',
    },
    {
      id: 5,
      name: 'پوریا قنبری',
      image: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
  ]

  return (
    <div className='space-y-6 bg-white p-8 shadow-2xl shadow-blue-300'>
      <div className='flex items-center justify-between border-b border-blue-100 pb-2'>
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
            className={`flex flex-wrap items-end gap-3 p-4 border border-blue-200 rounded-xl shadow-sm 
          bg-blue-50/50 hover:shadow-md transition-all`}
          >
            <div className='flex-1 min-w-[200px]'>
              <ComponentSearchable
                value={item.name}
                onChange={(val) => handleChange(item.id, 'name', val)}
                options={dummyPeople}
                onSelect={(id) => {
                  setSelectedId(id)
                  setSearchText(
                    dummyPeople.find((p) => p.id === id)?.name || ''
                  )
                }}
                placeholder='جستجو در لیست افراد...'
                label='انتخاب شخص'
              />
            </div>
            <div className='w-32 min-w-[100px]'>
              <InputNumber
                label='درصد'
                type='percent'
                value={item.percentage}
                onChange={(val) => handleChange(item.id, 'percentage', val)}
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
              <button onClick={() => handleDelete(item.id)}>
                <FaTrash
                  className='text-red-600  hover:bg-red-100 hover:scale-125 hover:p-1 hover:rotate-45 transition-all duration-300  rounded-full'
                  size={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 border-blue-100 text-sm text-blue-800 font-medium border-t pt-4'>
        <div>تعداد سهامداران: {shareholders.length}</div>
        <div>مجموع درصد: {total}%</div>
      </div>
    </div>
  )
}

export default AddShareholders
