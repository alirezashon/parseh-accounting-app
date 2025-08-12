import { errorClass } from '@/app/assets/style'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

type InputStatus = 'error' | 'ok' | 'unique' | 'need' | 'in' | ' '

interface InputNumberProps {
  value: number
  onChange: (val: number) => void
  label?: string
  type?: 'number' | 'percent'
  inputState?: InputStatus
  placeholder?: string
  message?: string
}

const InputNumber = ({
  value,
  onChange,
  label,
  type = 'number',
  inputState,
  placeholder,
  message,
}: InputNumberProps) => {
  const [local, setLocal] = useState(value)

  const handleChange = (val: number) => {
    let newVal = val

    if (type === 'percent') {
      if (val > 100) newVal = 100
      if (val < 0) newVal = 0
    }

    setLocal(newVal)
    onChange(newVal)
  }

  const statusColor =
    inputState === 'in'
      ? 'text-blue-500'
      : inputState === 'ok'
      ? 'text-green-500'
      : inputState === 'unique'
      ? 'text-red-300 '
      : inputState === 'need'
      ? 'text-yellow-500'
      : inputState === 'error'
      ? 'text-red-500'
      : 'text-gray-500'

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className={`font-medium  ${statusColor}`}>{label}</label>
      )}

      <div className='relative flex items-center'>
        <input
          inputMode='numeric'
          pattern='[0-9]*'
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, '')
            handleChange(Number(e.target.value))
          }}
          value={local}
          placeholder={placeholder}
          className={`w-full pr-10 text-right border bg-white border-gray-300 rounded px-3  outline-none  
          ${
            ['error', 'unique', 'need'].includes(inputState as string) &&
            errorClass
          }

          ${
            inputState === 'in'
              ? 'bg-blue-50 shadow-sm shadow-blue-500 text-blue-900'
              : inputState === 'ok'
              ? 'bg-green-50 shadow-sm shadow-green-500 text-green-900'
              : inputState === 'unique'
              ? 'bg-[rgb(225,46,40)] border-2 border-[#ff5e00] shadow-sm shadow-orange-400 text-[#ffffff]'
              : inputState === 'need'
              ? 'bg-yellow-100 shadow-sm shadow-yellow-500 text-[#f70909]'
              : inputState === 'error'
              ? 'bg-red-50 shadow-sm shadow-red-500'
              : ''
          }`}
        />
        <div className='absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1'>
          <button
            type='button'
            onClick={() => handleChange(local + 1)}
            className='text-blue-500 hover:text-blue-700'
          >
            <FiChevronUp size={18} />
          </button>
          <button
            type='button'
            onClick={() => handleChange(local - 1)}
            className='text-blue-500 hover:text-blue-700'
          >
            <FiChevronDown size={18} />
          </button>
        </div>
      </div>

      <b className={`absolute text-sm px-1 ${statusColor}`}>
        {message || inputState}
      </b>
    </div>
  )
}

export default InputNumber
