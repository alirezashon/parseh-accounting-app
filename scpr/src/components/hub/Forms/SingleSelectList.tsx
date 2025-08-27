import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

interface SingleSelectListProps {
  label: string
  items: { id: string | number; label: string }[]
  setSelectedItems: (selected: string | number) => void
}

const SingleSelectList: React.FC<SingleSelectListProps> = ({
  label,
  items,
  setSelectedItems,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | number | null>(null)
  const [filteredItems, setFilteredItems] = useState<
    { id: string | number; label: string }[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = (id: string | number) => {
    setSelectedItem(id)
    setSelectedItems(id)
    setIsOpen(false)
  }

  useEffect(() => {
    setFilteredItems(items)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [items])

  const filterData = (value: string) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredItems(filtered)
  }

  return (
    <div ref={containerRef} className='relative w-full'>
      <label className={`font-medium text-gray-500`}>{label}</label>
      <div
        className='border border-gray-300  h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='text-gray-700'>
          {selectedItem
            ? items.find((item) => item.id === selectedItem)?.label
            : label}
        </span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && (
        <div className='absolute py-5 max-h-[40vh] overflow-auto w-full border border-gray-300 bg-white rounded-md mt-2 shadow-md z-10'>
          <div className='sticky top-0 w-full flex items-center'>
            <div className='absolute left-10 mt-4 z-20 cursor-pointer text-[#50545F]'>
              <BiSearch size={24} color='gray' />
            </div>
            <input
              type='search'
              placeholder='جستجو'
              onChange={(e) => filterData(e.target.value)}
              className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:shadow-purple-600 focus:shadow-md'
            />
          </div>
          <div className='mt-8'>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                  selectedItem !== item.id &&
                  'text-[#2F27CE] hover:bg-gray-100 hover:text-[#2F27CE]'
                }`}
                onClick={() => handleSelect(item.id)}
              >
                <input
                  type='radio'
                  checked={selectedItem === item.id}
                  readOnly
                  className='form-radio h-5 w-5 text-[#2F27CE] accent-[#2F27CE]'
                />
                <span
                  className={`${
                    selectedItem === item.id
                      ? 'text-[primary65]'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default SingleSelectList
