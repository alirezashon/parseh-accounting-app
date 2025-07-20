import React from 'react'
import Switch from '../Switch'

const SwitchBox = ({
  value,
  onChange,
  label,
  inputState,
  rightText,
  leftText,
}: {
  value: boolean
  onChange: (value: boolean) => void
  label?: string
  inputState?: 'error' | 'ok' | ' '
  rightText: string
  leftText: string
}) => {
  return (
    <div className=' flex flex-col gap-2'>
      <label className='text-gray-600'>{label}</label>
      <div
        className={`flex border-b h-full ${
          inputState === 'error'
            ? 'border-b-2 border-[#ee3636]'
            : 'border-[#2775ce64] '
        } gap-5 items-center`}
      >
        <label className='flex items-center  '>{rightText}</label>
        <Switch
          isActive={value}
          setIsActive={(value: boolean) => onChange(value)}
        />
        <label className='flex items-center gap-2'>{leftText}</label>
      </div>
    </div>
  )
}

export default SwitchBox
