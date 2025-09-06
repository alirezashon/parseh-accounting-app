import { errorClass } from '@/app/assets/style'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { useState, useEffect } from 'react'

type InputStatus = 'error' | 'ok' | 'unique' | 'need' | 'in' | ' '

interface InputNumberProps {
  value: number
  onChange: (val: number) => void
  label?: string
  type?: 'number' | 'percent'
  inputState?: InputStatus
  placeholder?: string
  message?: string
  className?: string
}

const InputNumber = ({
  value,
  onChange,
  label,
  type = 'number',
  inputState,
  placeholder,
  message,
  className,
}: InputNumberProps) => {
  const [local, setLocal] = useState<string>(() =>
    value === 0 ? '' : value.toString()
  )

  useEffect(() => {
    if (value === 0) {
      setLocal('')
    } else {
      setLocal(value.toString())
    }
  }, [value])

  const handleChange = (val: string) => {
    // اگر کاربر خالی کرد، اجازه بدهیم
    if (val === '') {
      setLocal('')
      return
    }

    const num = Number(val)
    if (isNaN(num)) return

    let newVal = num

    if (type === 'percent') {
      if (newVal > 100) newVal = 100
      if (newVal < 0) newVal = 0
    }

    setLocal(newVal.toString())
    onChange(newVal)
  }

  const statusColor =
    inputState === 'in'
      ? 'text-blue-500'
      : inputState === 'ok'
      ? 'text-green-500'
      : inputState === 'unique'
      ? 'text-red-300'
      : inputState === 'need'
      ? 'text-yellow-500'
      : inputState === 'error'
      ? 'text-red-500'
      : 'text-gray-500'

  return (
    <div className="flex flex-col">
      {label && <label className={`font-medium ${statusColor}`}>{label}</label>}

      <div className="relative flex items-center">
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '')
            handleChange(val)
          }}
          value={local == '0' ? '' : local}
          placeholder={placeholder}
          className={`w-full pr-10 text-right border bg-white border-gray-300 px-3 outline-none
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
            } ${className || ''}`}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              const newVal = Number(local || '0') + 1
              setLocal(newVal.toString())
              onChange(newVal)
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiChevronUp size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              const newVal = Math.max(0, Number(local || '0') - 1)
              setLocal(newVal.toString())
              onChange(newVal)
            }}
            className="text-blue-500 hover:text-blue-700"
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
