'use client'
import MainHead from '@/components/Headers/MainHead'
import MainLayout from '@/layouts/Main'
import { useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { BsDatabaseFillGear } from 'react-icons/bs'
import {
  FaChevronLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaPlusCircle,
} from 'react-icons/fa'
import { FaChartPie, FaDiagramProject } from 'react-icons/fa6'

export interface TreeChartInterface {
  id: number
  chpid: number
  chtitle: string
  chstatus: number
  chlevel: number
  lev1_count: number
  chlabel?: string | null
}

const generateMockTreeData = (
  maxLevel: number = 3,
  maxItemsPerLevel: number = 10
): TreeChartInterface[] => {
  let idCounter = 1
  const data: TreeChartInterface[] = []

  const generateChildren = (parentId: number, level: number) => {
    if (level > maxLevel) return

    const count = Math.min(2, maxItemsPerLevel) // Max 2 per node to keep tree shape
    for (let i = 0; i < count; i++) {
      const newItem: TreeChartInterface = {
        id: idCounter,
        chpid: parentId,
        chtitle: `Level ${level} - Node ${idCounter}`,
        chstatus: 1,
        chlevel: level,
        lev1_count: 0,
      }
      data.push(newItem)
      const currentId = idCounter
      idCounter++
      generateChildren(currentId, level + 1)
    }
  }

  // Start with top-level nodes (level 0)
  for (let i = 0; i < maxItemsPerLevel; i++) {
    const rootItem: TreeChartInterface = {
      id: idCounter,
      chpid: 0,
      chtitle: `Level 0 - Node ${idCounter}`,
      chstatus: 1,
      chlevel: 0,
      lev1_count: 0,
    }
    data.push(rootItem)
    const rootId = idCounter
    idCounter++
    generateChildren(rootId, 1)
  }

  return data
}

const mockData: TreeChartInterface[] = generateMockTreeData()

const levelol: string[][] = [
  [
    'bg-blue-200  py-4',
    'bg-blue-300 mt-5 py-4 rounded-xl',
    'bg-blue-400 mt-5 py-4 rounded-xl',
    'bg-blue-500 mt-5 py-4 rounded-xl',
    '',
  ], // برای UL لایه‌ها نیازی به استایل نیست

  [
    // استایل Box هر لایه
    'bg-white my-3 border-y-8 border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm rounded-xl',
    'bg-blue-50 my-2 border-l-4 border-blue-300 hover:bg-blue-100 transition-all duration-300 shadow-md rounded-xl',
    'bg-blue-100 my-3 border-l-4 border-blue-400 hover:bg-blue-200 transition-all duration-300 shadow-md rounded-xl',
    'bg-blue-200 my-3 border-l-4 border-indigo-300 hover:bg-indigo-200 transition-all duration-300 shadow-md rounded-xl',
  ],

  [
    // لیبل
    'bg-blue-100 text-blue-800 border-2 rounded-lg',
    'bg-blue-200 text-blue-800',
    'bg-blue-300 text-blue-900',
    'bg-white rounded text-indigo-900',
  ],

  [
    // بدنه متن و آیکون‌ها
    'text-blue-800',
    'text-blue-900',
    'text-blue-700',
    'text-blue-600',
  ],
  ['', '', '', ''],
]

const AcctypesLevels = ({ levelo }: { levelo: number }) => {
  const [treeData, setTreeData] = useState<TreeChartInterface[]>(mockData)
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const [editableRow, setEditableRow] = useState<TreeChartInterface | null>(
    null
  )

  const toggleNode = (id: number) => {
    setOpenTrees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    if (!editableRow) return
    setTreeData((prev) =>
      prev.map((item) =>
        item.id === editableRow.id ? { ...item, ...editableRow } : item
      )
    )
    setEditableRow(null)
  }

  const renderTree = (parentId: number, level = 0): React.JSX.Element => {
    const nodes = treeData.filter((node) => node.chpid === parentId)
    return (
      <ul className={` ${levelol[0][level]}`}>
        {nodes.map((node) => {
          const isEditing = editableRow?.id === node.id
          return (
            <li key={node.id} className={`mx-5 px-4 py-3 ${levelol[1][level]}`}>
              <div
                className={`flex items-center cursor-pointer ${levelol[3][level]} gap-3`}
                onClick={() => toggleNode(node.id)}
              >
                <FaChevronLeft
                  className={`transition-transform duration-300 ${
                    openTrees.includes(node.id) ? '-rotate-90' : ''
                  }`}
                />
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  {isEditing ? (
                    <input
                      className="border border-blue-300 text-sm rounded px-2 py-1 bg-white"
                      value={editableRow?.chtitle || ''}
                      onChange={(e) =>
                        setEditableRow((prev) =>
                          prev ? { ...prev, chtitle: e.target.value } : null
                        )
                      }
                    />
                  ) : (
                    <span className="font-medium">{node.chtitle}</span>
                  )}

                  <span
                    className={`text-xs px-3 py-1 rounded border ${levelol[2][level]}`}
                  >
                    {isEditing ? (
                      <input
                        className="bg-transparent text-center w-[80px]"
                        defaultValue={node?.chlabel || ''}
                        onChange={(e) =>
                          setEditableRow((prev) =>
                            prev ? { ...prev, chlabel: e.target.value } : null
                          )
                        }
                      />
                    ) : (
                      node.chlabel || 'بدون برچسب'
                    )}
                  </span>

                  {isEditing ? (
                    <>
                      <FaCheckCircle
                        className="text-2xl cursor-pointer"
                        onClick={handleSave}
                      />
                      <FaTimesCircle
                        className="text-2xl cursor-pointer"
                        onClick={() => setEditableRow(null)}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        className="text-xl  cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditableRow(node)
                        }}
                      />
                      <FaPlusCircle
                        className="text-xl cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`افزودن زیرشاخه برای: ${node.chtitle}`)
                        }}
                      />
                    </>
                  )}
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
    <MainLayout>
      <MainHead
        icons={[
          {
            icon: <FaChartPie size={30} />,
            label: 'گزارش‌ها',
            destination: '/reports',
          },
          {
            icon: <BsDatabaseFillGear size={30} />,
            label: 'کسب‌و‌کار',
            destination: '/bussines',
          },
          {
            icon: <FaDiagramProject size={30} />,
            label: 'ارتباطات',
            destination: '/relations',
          },
          {
            icon: <AiFillSetting size={30} />,
            label: 'تنظیمات',
            destination: '/setting',
          },
        ]}
      />
      <div className="p-6 bg-blue-50 min-h-screen">
        <div className="text-xl font-bold mb-6 text-blue-700">جدول حساب ها</div>
        <div className="rounded-md p-4 shadow">{renderTree(0)}</div>
      </div>
    </MainLayout>
  )
}

export default AcctypesLevels
