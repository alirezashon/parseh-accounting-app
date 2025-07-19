const Input = ({
  value,
  onChange,
  label,
  inputStates,
  focused,
  message,
}: {
  value: string
  onChange: (text: string) => void
  label?: string
  inputStates?: 'error' | 'ok' | 'unique' | 'need' | 'in' | ' '
  focused?: () => void
  message?: string
}) => {
  return (
    <div className='flex flex-col transition-all duration-700'>
      <label
        className={`font-medium ${
          inputStates === 'in'
            ? 'text-blue-500'
            : inputStates === 'ok'
            ? 'text-green-500'
            : inputStates === 'unique'
            ? 'text-orange-400 '
            : inputStates === 'need'
            ? 'text-yellow-500'
            : inputStates === 'error'
            ? 'text-red-500'
            : 'text-gray-500'
        }`}
      >
        {label}
      </label>
      <input
        onFocus={focused}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input border   rounded px-3 py-2 ${
          inputStates === 'in'
            ? 'bg-blue-50 shadow-sm shadow-blue-500 text-blue-900'
            : inputStates === 'ok'
            ? 'bg-green-50 shadow-sm shadow-green-500 text-green-900'
            : inputStates === 'unique'
            ? 'bg-[rgb(255,160,52)] border-2 border-[#ff5e00] shadow-sm shadow-orange-400 text-[#ffffff]'
            : inputStates === 'need'
            ? 'bg-yellow-100 shadow-sm shadow-yellow-500 text-[#f75909]'
            : inputStates === 'error' && 'bg-red-50 shadow-sm shadow-red-500'
        }`}
      />
      <b
        className={`px-1 ${
          inputStates === 'in'
            ? 'text-blue-500'
            : inputStates === 'ok'
            ? 'text-green-500'
            : inputStates === 'unique'
            ? 'text-orange-400 '
            : inputStates === 'need'
            ? 'text-yellow-500'
            : inputStates === 'error' && 'text-red-500'
        }`}
      >
        {message || inputStates}
      </b>
    </div>
  )
}

export default Input
