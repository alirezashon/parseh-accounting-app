import { useState } from 'react'

interface RadioTreeSelectorProps {
  items: { value: string; id: string | number }[]
  placeholder: string
  onSelect: (selected: string) => void
}

const RadioSelectList: React.FC<RadioTreeSelectorProps> = ({
  items,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const handleSelect = (item: { value: string; id: string | number }) => {
    setSelectedName(item.value)
    onSelect(String(item.id))
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      {/* کنترل اصلی */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white text-gray-700 hover:border-purple-500 focus:outline-none"
      >
        <span>{selectedName || placeholder}</span>
        <span className="text-gray-400">&#x25BC;</span>
      </button>

      {/* لیست آیتم‌ها */}
      {isOpen && (
        <div className="absolute mt-2 w-full border-4 border-gray-200 rounded-md bg-white shadow-sm max-h-60 overflow-y-auto z-10">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-purple-50 transition"
              onClick={() => handleSelect(item)}
            >
              <input
                type="radio"
                name="radio-select"
                checked={selectedName === item.value}
                readOnly
                className="form-radio text-purple-600 h-4 w-4"
              />
              <span
                className={`text-sm ${
                  selectedName === item.value ? 'text-purple-700 font-medium' : 'text-gray-700'
                }`}
              >
                {item.value}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default RadioSelectList
