type TextAreaProps = {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  rows?: number
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 3,
}) => {
  return (
    <div className='flex flex-col gap-1 w-full mb-4'>
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none'
      />
    </div>
  )
}

export default TextArea
