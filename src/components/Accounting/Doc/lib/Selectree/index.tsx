'use client'
import { useEffect, useRef, useState } from 'react'
import Selectree from './Tree'
 
export interface TreeNode {
  id: number
  chpid: number
  chtitle: string
}

interface TreeSelectListProps {
  label?: string
  data: TreeNode[]
  value?: number | null
  onChange: (id: number) => void
}

const TreeSelectList: React.FC<TreeSelectListProps> = ({
  label = 'انتخاب آیتم',
  data,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredItems, setFilteredItems] = useState<
    { id: number; label: string }[]
  >([])
  const containerRef = useRef<HTMLDivElement>(null)

  // flatten tree into list with "—" prefixes
  const flattenTree = (
    nodes: TreeNode[],
    parentId = 0,
    prefix = ''
  ): { id: number; label: string }[] => {
    const result: { id: number; label: string }[] = []
    nodes
      .filter((node) => node.chpid === parentId)
      .forEach((node) => {
        result.push({ id: node.id, label: `${prefix}${node.chtitle}` })
        result.push(...flattenTree(nodes, node.id, prefix + '— '))
      })
    return result
  }

  // setup filtered tree items
  useEffect(() => {
    const flat = flattenTree(data)
    setFilteredItems(flat)
  }, [treeData])

  // close dropdown on outside click
  useEffect(() => {


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
  }, [])

  const selectedLabel = flattenTree(treeData).find((i) => i.id === value)?.label

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      {label && (
        <label className="block mb-1 text-sm text-gray-600">{label}</label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded-md h-10 px-4 py-2 flex items-center justify-between cursor-pointer bg-white"
      >
        <span className="text-gray-700 text-sm">
          {selectedLabel || 'یک گزینه انتخاب کنید'}
        </span>
        <span className="text-gray-400 text-xs">&#x25BC;</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-[130%] mt-1 bg-white border border-gray-300 rounded-md shadow max-h-96 overflow-y-auto">
          <Selectree />
        </div>
      )}
    </div>
  )
}

const treeData = [
  { id: 1, chpid: 0, chtitle: 'دارایی‌ها' },
  { id: 2, chpid: 1, chtitle: 'دارایی‌های جاری' },
  { id: 3, chpid: 1, chtitle: 'دارایی‌های غیرجاری' },
  { id: 4, chpid: 0, chtitle: 'بدهی‌ها' },
  { id: 5, chpid: 4, chtitle: 'بدهی جاری' },
]
const page = () => {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <TreeSelectList
      label="انتخاب حساب"
      data={treeData}
      value={selected}
      onChange={setSelected}
    />
  )
}

export default page
