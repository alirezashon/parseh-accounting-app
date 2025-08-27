import { useRef, useState } from 'react'
import { CgArrowLeftR } from 'react-icons/cg'
import { PiCubeTransparentDuotone } from 'react-icons/pi'
import { TbArrowBearRight2 } from 'react-icons/tb'
interface TreeItem {
  id: number | string
  label: string
  children: { id: number | string; label: string }[]
}
interface RadioTreeSelectorProps {
  trees: TreeItem[]
  placeholder: string
  onSelect: (selected: string[]) => void
  label?: string
}

const MultiSelectTrees: React.FC<RadioTreeSelectorProps> = ({
  trees,
  placeholder,
  onSelect,
  label,
}) => {
  const [selectedManager, setSelectedManager] = useState<
    number | string | null
  >(null)
  const [isOpen, setIsOpen] = useState(false)
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down')
  const [selectedItems, setSelectedItemsState] = useState<(string | number)[]>(
    []
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCheckboxChange = (id: string | number) => {
    const updated = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id]
    setSelectedItemsState(updated)
    onSelect(updated.map(String))
  }

  const toggleDropdown = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const mid = viewportHeight / 2

    setOpenDirection(rect.top < mid ? 'down' : 'up')
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='w-full relative' ref={containerRef}>
      {label && (
        <label className='block text-sm text-gray-600 mb-1'>{label}</label>
      )}

      <div
        className='border border-gray-300 h-10 py-2 px-4 cursor-pointer flex justify-between items-center bg-white relative z-10'
        onClick={toggleDropdown}
      >
        <span className='text-gray-700'>
          {selectedItems.length > 0
            ? selectedItems
                .map((id) => {
                  const parent = trees.find((tree) =>
                    tree.children.some((child) => child.id === id)
                  )
                  return parent?.children.find((child) => child.id === id)
                    ?.label
                })
                .filter(Boolean)
                .join(', ')
            : placeholder}
        </span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>

      {isOpen && (
        <div
          className={`absolute w-full bg-white border rounded-lg shadow-lg z-20 ${
            openDirection === 'down' ? 'top-[110%]' : 'bottom-[110%]'
          }`}
        >
          {!selectedManager ? (
            <div className='flex flex-col max-h-60 overflow-y-auto'>
              {trees.map((tree) => (
                <div
                  key={tree.id}
                  className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => setSelectedManager(tree.id)}
                >
                  <div className='flex items-center gap-2'>
                    <PiCubeTransparentDuotone size={24} color='#2f27ce' />
                    <span>{tree.label}</span>
                  </div>
                  <CgArrowLeftR size={18} color='#2f27ce' />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col max-h-60 overflow-y-auto'>
              <div
                className='flex items-center px-4 py-2 cursor-pointer text-[#7747C0]'
                onClick={() => setSelectedManager(null)}
              >
                <TbArrowBearRight2 size={18} color='#7747C0' />
                <span className='ml-1'>بازگشت</span>
              </div>
              {trees
                .find((tree) => tree.id === selectedManager)
                ?.children.map((child) => (
                  <label
                    key={child.id}
                    className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-purple-50'
                  >
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(child.id)}
                      onChange={() => handleCheckboxChange(child.id)}
                      className='form-checkbox h-5 w-5 border-2 rounded accent-[#7747C0] cursor-pointer'
                    />
                    <span
                      className={
                        selectedItems.includes(child.id)
                          ? 'text-[#7747C0]'
                          : 'text-gray-700'
                      }
                    >
                      {child.label}
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MultiSelectTrees
