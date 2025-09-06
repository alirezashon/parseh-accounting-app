'use client'
import { useRef, useState, useCallback, JSX, RefObject } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaLocationArrow } from 'react-icons/fa6'
import {
  levelol,
  TreeChartInterface,
} from '@/components/Accounting/hub/AcctypesLevels/lib/data'
import useClickOutside from '@/hook/useClickOutside'

type Props = {
  label?: string
  theme?: string
  data?: TreeChartInterface[]
  onUnselect?: (allChildIds: (string | number)[]) => void
  onSelect?: (node: TreeChartInterface) => void
  placeholder?: string
}

const Selectree = ({
  label,
  theme,
  data = [],
  onUnselect,
  onSelect,
  placeholder,
}: Props) => {
  const [openTrees, setOpenTrees] = useState<(number | string)[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<TreeChartInterface[]>([])
  const [selectedNode, setSelectedNode] = useState<TreeChartInterface | null>(
    null
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useClickOutside(wrapperRef as RefObject<HTMLElement>, () =>
    setShowDropdown(false)
  )

  const toggleNode = useCallback((id: number | string) => {
    setOpenTrees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const getParentIds = useCallback(
    (id: number | string): (number | string)[] => {
      const ids: number[] = []
      let current = data.find((item) => item.id === id)
      while (current && current.chpid !== 0) {
        ids.unshift(current.chpid)
        current = data.find((item) => item.id === current!.chpid)
      }
      return ids
    },
    [data]
  )

  const getAllChildIds = useCallback(
    (id: number | string): (number | string)[] => {
      const collect = (parentId: number | string): (number | string)[] => {
        const children = data.filter((item) => item.chpid === parentId)
        return children.flatMap((child) => [child.id, ...collect(child.id)])
      }
      return collect(id)
    },
    [data]
  )

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term)
      if (!term.trim()) {
        setSearchResults([])
        return
      }
      const lowerTerm = term.toLowerCase()
      const results = data.filter((item) =>
        item.chtitle.toLowerCase().includes(lowerTerm)
      )
      setSearchResults(results)
    },
    [data]
  )

  const focusNode = useCallback(
    (node: TreeChartInterface) => {
      if (selectedNode?.id === node.id) {
        setSelectedNode(null)
        onUnselect?.(getAllChildIds(node.id))
        return
      }
      const parentIds = getParentIds(node.id)
      const fullPath = [...parentIds, node.id].join('|') // ← این خط اضافه شده
      setOpenTrees((prev) => [...new Set([...prev, ...parentIds, node.id])])
      setSelectedNode(node)
      setSearchTerm('')
      setSearchResults([])

      onSelect?.({
        ...node,
        fullPath, // ← اینو بهش اضافه می‌کنیم
      } as TreeChartInterface & { fullPath: string })

      setTimeout(() => {
        const ref = nodeRefs.current[node.id as number]
        if (ref) {
          ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ref.classList.add('ring-4', 'ring-blue-400', 'rounded-lg')
          setTimeout(() => {
            ref.classList.remove('ring-4', 'ring-blue-400', 'rounded-lg')
          }, 2000)
        }
      }, 300)
    },
    [getAllChildIds, getParentIds, selectedNode, onUnselect, onSelect]
  )
  const getPlaceholderTitles = (placeholder?: string): string => {
    if (!placeholder) return ''

    const ids = placeholder.split('|')
    const titles = ids
      .map((id) => {
        const item = data.find((d) => d.id.toString() === id)
        return item?.chtitle
      })
      .filter(Boolean) // حذف undefined

    return titles.join(' > ')
  }

  const renderTree = (parentId: number, level = 0): JSX.Element => {
    const nodes = data.filter((node) => node.chpid === parentId)
    return (
      <ul className={`${levelol[0][level]} w-[120%]`}>
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id
          return (
            <li key={node.id} className={levelol[1][level]}>
              <div
                ref={(el) => {
                  nodeRefs.current[node.id as number] = el
                }} // ✅ حل خطای TypeScript
                className={`transition-all duration-300 flex items-center gap-3 rounded-lg px-3 cursor-pointer border-b 
                  ${
                    isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold'
                      : 'hover:bg-gray-100 border-gray-100'
                  }`}
                onClick={() => toggleNode(node.id)}
              >
                <FaChevronLeft
                  className={`transition-transform duration-300 ${
                    openTrees.includes(node.id) ? '-rotate-90' : ''
                  } text-gray-500`}
                />
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() => focusNode(node)}
                  onClick={(e) => e.stopPropagation()}
                  className="accent-blue-500"
                />
                <div className="flex-1 text-nowrap text-sm text-blue-400">
                  {node.chtitle}
                </div>
              </div>
              {openTrees.includes(node.id) && (
                <div className="pl-6">
                  {renderTree(node.id as number, level + 1)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-md bg-white max-w-[800px]"
    >
      {label && (
        <label className={`font-medium text-gray-500 ${theme}`}>{label}</label>
      )}

      <div
        className="w-full h-10 px-2 border border-gray-300 shadow-sm flex justify-between items-center cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="text-gray-700 text-sm truncate">
          {selectedNode?.chtitle ||
            getPlaceholderTitles(placeholder) ||
            'یک مورد انتخاب کنید'}
        </span>

        <FaLocationArrow className="text-blue-400 rotate-135" />
      </div>

      {showDropdown && (
        <div className="absolute z-50 min-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-[400px] overflow-y-auto px-2">
          <input
            type="text"
            placeholder="جستجو در زیرشاخه‌ها..."
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchTerm ? (
            searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => focusNode(item)}
                  className="cursor-pointer hover:bg-blue-100 px-2 py-1 text-sm"
                >
                  {item.chtitle}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 px-2">
                نتیجه‌ای یافت نشد
              </div>
            )
          ) : (
            <div className="overflow-x-auto mt-2">{renderTree(0)}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Selectree
