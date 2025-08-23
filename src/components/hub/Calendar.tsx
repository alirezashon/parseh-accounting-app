'use client'

import { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_en from 'react-date-object/locales/persian_fa'
import { BiCalendar } from 'react-icons/bi'

interface Props {
  setDate: (date: string) => void
  placeholder?: string
  hasError?: boolean
  label?: string
}

const Calendar: React.FC<Props> = ({
  setDate,
  placeholder,
  hasError,
  label,
}) => {
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null)

  const handleChange = (date: DateObject) => {
    setSelectedDate(date)
    setDate(
      date
        .format('YYYY-MM-DD')
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()) // تبدیل عدد به رشته
    )
  }

  return (
    <div className="flex flex-col">
      {label && <label className='text-gray-500'> {label}</label>}
      <div className="relative w-full">
        <DatePicker
          containerClassName={'w-full '}
          placeholder={placeholder}
          value={selectedDate}
          onChange={handleChange}
          calendar={persian}
          locale={persian_en}
          inputClass={`w-full border border-blue-200 ${
            hasError &&
            'border-red-300 border-none shadow-red-200 shadow-md error-input-animated'
          } px-3 h-10`}
        />

        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
          <BiCalendar size={24} color="gray" />
        </span>
      </div>
    </div>
  )
}

export default Calendar
