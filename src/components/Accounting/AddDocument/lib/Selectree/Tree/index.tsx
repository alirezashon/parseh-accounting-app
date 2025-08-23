'use client'
import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
import {
  levelol,
  TreeChartInterface,
} from '../../../../hub/AcctypesLevels/lib/data'
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

const Selectree = ({ label, theme }: { label?: string, theme?: string }) => {
  const [treeData, setTreeData] = useState<TreeChartInterface[]>([])
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<TreeChartInterface[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTreeData()
      setTreeData(data)
    }
    fetchData()
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
    const parentIds = getParentIds(node.id)
    setOpenTrees((prev) => [...new Set([...prev, ...parentIds, node.id])])

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

  const renderTree = (parentId: number, level = 0): React.JSX.Element => {
    const nodes = treeData.filter((node) => node.chpid === parentId)
    return (
      <ul className={` ${levelol[0][level]} w-[120%]`}>
        {nodes.map((node) => {
          const children = treeData.filter((item) => item.chpid === node.id)
          const isSelected = selectedId === node.id

          return (
            <li key={node.id} className={` ${levelol[1][level]}`}>
              <div
                ref={(el) => {
                  nodeRefs.current[node.id] = el
                }}
                className={`transition-all duration-300 flex items-center gap-3 rounded-lg px-3 cursor-pointer border-b ${isSelected
                  ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold'
                  : 'hover:bg-gray-100 border-gray-100'
                  }`}
                onClick={() => toggleNode(node.id)}
              >
                <FaChevronLeft
                  className={`transition-transform duration-300 ${openTrees.includes(node.id) ? '-rotate-90' : ''
                    } text-gray-500`}
                />
                <input
                  type="radio"
                  checked={selectedId === node.id}
                  onChange={() => setSelectedId(node.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="accent-blue-500"
                />
                <div className="flex-1 text-nowrap">
                  <span className="text-sm text-blue-400 ">{node.chtitle}</span>
                  {/* <div className="text-xs text-gray-500">{node.chlabel}</div> */}
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
    <div className="relative rounded-md shadow bg-white max-w-[800px]">
      {/* Search Box */}
      <div className="relative z-10">
        {label && (
          <label className={`font-medium text-gray-500 ${theme}`}>{label}</label>
        )}
        <input
          type="text"
          placeholder="جستجوی زیرشاخه‌ها"
          className="w-full p-3 border border-gray-300  shadow-sm focus:outline-none focus:border-2 focus:border-blue-400"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[300px] overflow-y-auto animate-slide-in z-20">
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => focusNode(item)}
                className="cursor-pointer hover:bg-blue-100 px-4 py-2 text-sm text-nowrap"
              >
                {item.chtitle}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tree View */}
      <div className="overflow-x-auto">{renderTree(0)}</div>
    </div>
  )
}

export default Selectree
