'use client'
import {
  levelol,
  TreeChartInterface,
} from '@/components/Accounting/hub/AcctypesLevels/lib/data'
import { useRef, useState, useEffect, JSX } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaLocationArrow } from 'react-icons/fa6'

type Props = {
  label?: string
  theme?: string
  treeData: TreeChartInterface[]
  onUnselect?: (allChildIds: number[]) => void
}

const Selectree = ({ label, theme, treeData, onUnselect }: Props) => {
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<TreeChartInterface[]>([])
  const [selectedNode, setSelectedNode] = useState<TreeChartInterface | null>(
    null
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleNode = (id: number) => {
    setOpenTrees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const getParentIds = (nodeId: number): number[] => {
    const ids: number[] = []
    let current = treeData.find((item) => item.id === nodeId)
    while (current && current.chpid !== 0) {
      ids.unshift(current.chpid)
      current = treeData.find((item) => item.id === current!.chpid)
    }
    return ids
  }

  const getAllChildIds = (id: number): number[] => {
    const collect = (parentId: number): number[] => {
      const children = treeData.filter((item) => item.chpid === parentId)
      return children.flatMap((child) => [child.id, ...collect(child.id)])
    }
    return collect(id)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setSearchResults([])
      return
    }
    const lowerTerm = term.toLowerCase()
    const results = treeData.filter((item) =>
      item.chtitle.toLowerCase().includes(lowerTerm)
    )
    setSearchResults(results)
  }

  const focusNode = (node: TreeChartInterface) => {
    if (selectedNode?.id === node.id) {
      // اگر دوباره روش کلیک شد، unselect کن
      setSelectedNode(null)
      const allChildIds = getAllChildIds(node.id)
      onUnselect?.(allChildIds)
      return
    }

    const parentIds = getParentIds(node.id)
    setOpenTrees([...new Set([...openTrees, ...parentIds, node.id])])
    setSelectedNode(node)
    setSearchTerm('')
    setSearchResults([])

    setTimeout(() => {
      const ref = nodeRefs.current[node.id]
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
        ref.classList.add('ring-4', 'ring-blue-400', 'rounded-lg')
        setTimeout(() => {
          ref.classList.remove('ring-4', 'ring-blue-400', 'rounded-lg')
        }, 2000)
      }
    }, 300)
  }

  const renderTree = (parentId: number, level = 0): JSX.Element => {
    const nodes = treeData.filter((node) => node.chpid === parentId)
    return (
      <ul className={`${levelol[0][level]} w-[120%]`}>
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id
          return (
            <li key={node.id} className={`${levelol[1][level]}`}>
              <div
                ref={(el) => {
                  nodeRefs.current[node.id] = el
                }}
                className={`transition-all duration-300 flex items-center gap-3 rounded-lg px-3 cursor-pointer border-b ${
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
                  checked={selectedNode?.id === node.id}
                  onChange={() => focusNode(node)}
                  onClick={(e) => e.stopPropagation()}
                  className="accent-blue-500"
                />
                <div className="flex-1 text-nowrap text-sm text-blue-400">
                  {node.chtitle}
                </div>
              </div>

              {openTrees.includes(node.id) && (
                <div className="pl-6">{renderTree(node.id, level + 1)}</div>
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
        ref={inputRef}
        className="w-full h-10 px-2 border border-gray-300 shadow-sm flex justify-between items-center cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-gray-700 text-sm truncate">
          {selectedNode?.chtitle || 'یک مورد انتخاب کنید'}
        </span>
        <FaLocationArrow className="text-blue-400 rotate-135" />
      </div>

      {showDropdown && (
        <div className="absolute z-50  w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-[400px] overflow-y-auto px-2">
          <input
            type="text"
            placeholder="جستجو در زیرشاخه‌ها..."
            className="w-full   border border-gray-300   focus:outline-none focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 ? (
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
            <div className="text-sm text-gray-400 px-2">نتیجه‌ای یافت نشد</div>
          )}
          {/* درخت در همین dropdown */}
          <div className="overflow-x-auto mt-2">{renderTree(0)}</div>
        </div>
      )}
    </div>
  )
}

export default Selectree
