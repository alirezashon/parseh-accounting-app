'use client'
import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { ConfirmDialog } from '@/components/hub/ConfirmDialog'
import { Modal } from '@/components/hub/Modal'
import AddPersons from '@/components/Persons/Add'

export type InputStatus = 'error' | 'ok' | 'unique' | 'need' | 'in' | ' '

export interface BaseInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  inputState?: { status: InputStatus }
  focused?: () => void
  message?: string
  placeholder?: string
}

interface Person {
  id: number
  name: string
  image: string
}

interface SearchSelectInputProps extends BaseInputProps {
  options: Person[]
  onSelect: (id: number) => void
}

const SearchPersonInput = ({
  value,
  onChange,
  options,
  onSelect,
  placeholder,
  label,
}: SearchSelectInputProps) => {
  const [focused, setFocused] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toDelete, setToDelete] = useState<Person | null>(null)

  const handleChange = (val: string) => {
    onChange(val)
  }

  const handleSelect = (person: Person) => {
    onChange(person.name)
    onSelect(person.id)
    setFocused(false)
  }

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(value.toLowerCase())
  )

  const handleDelete = (item: Person) => {
    setToDelete(item)
    setShowConfirm(true)
  }

  return (
    <>
      <div className='w-full relative'>
        {label && (
          <label className='block text-blue-700 font-semibold mb-1'>
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className='w-full px-4 py-2 border-2 border-blue-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white pr-10'
          />
          <FiPlus
            className='absolute left-3 hover:bg-blue-100 hover:scale-125  rounded-full top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer text-lg'
            onClick={() => setShowModal(true)}
          />
        </div>

        {focused && filtered.length > 0 && (
          <ul className='absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-xl shadow-lg max-h-60 overflow-auto'>
            {filtered.map((item) => (
              <li
                key={item.id}
                className='flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-50 border-b border-blue-100 transition-all'
              >
                <div
                  className='flex items-center gap-3 cursor-pointer flex-1'
                  onClick={() => handleSelect(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-10 h-10 rounded-full border border-blue-300 object-cover'
                  />
                  <span className='text-gray-800 font-medium'>{item.name}</span>
                </div>
                <div className='flex gap-2 text-blue-600'>
                  <FiEdit2
                    size={16}
                    className='text-[#1414cf] cursor-pointer   hover:scale-125  hover:-rotate-45 transition-all duration-300   '
                    onClick={() => setShowModal(true)}
                  />
                  <FiTrash2
                    size={16}
                    className='text-red-600 cursor-pointer  hover:bg-red-100 hover:scale-125  hover:rotate-45 transition-all duration-300  rounded-full'
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {showModal && (
          <Modal isOpen onClose={() => setShowModal(false)}>
            <div className='p-4'>
              <h2 className='text-xl font-bold text-blue-700 mb-4'>
                افزودن / ویرایش شخص
              </h2>
              <AddPersons />
              <button
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'
                onClick={() => setShowModal(false)}
              >
                بستن
              </button>
            </div>
          </Modal>
        )}
      </div>
      {showConfirm && toDelete && (
        <ConfirmDialog
          message='حذف شخص'
          description={`آیا از حذف "${toDelete.name}" مطمئنی؟`}
          imageSrc={'https://randomuser.me/api/portraits/women/41.jpg'} // اگر آواتار داشت
          onConfirm={() => {
            console.log('حذف شد:', toDelete.id)
            setShowConfirm(false)
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}

export default SearchPersonInput
