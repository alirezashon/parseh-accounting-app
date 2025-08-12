'use client'
import MainHead from '@/components/Headers/MainHead'
import MainLayout from '@/layouts/Main'
import { useEffect, useState } from 'react'
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
import { getAllTreeData } from './lib/convertors'
import { levelol, TreeChartInterface } from './lib/data'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'

const AcctypesLevels = () => {
  const [treeData, setTreeData] = useState<TreeChartInterface[]>([])
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const [editableRow, setEditableRow] = useState<TreeChartInterface | null>(
    null
  )
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

  const handleSave = () => {
    if (!editableRow) return
    setTreeData((prev) =>
      prev.map((item) =>
        item.id === editableRow.id ? { ...item, ...editableRow } : item
      )
    )
    setEditableRow(null)
  }

  const handleAddNode = (parentId: number, level: number) => {
    const children = treeData.filter((item) => item.chpid === parentId)
    if (children.length >= 5) return

    const newId = Math.max(...treeData.map((x) => x.id)) + 1
    const newNode: TreeChartInterface = {
      id: newId,
      chpid: parentId,
      chtitle: 'زیرشاخه جدید',
      chstatus: 1,
      chlevel: level + 1,
      lev1_count: 0,
    }
    setTreeData((prev) => [...prev, newNode])
    setOpenTrees((prev) => [...new Set([...prev, parentId, newId])])
    setEditableRow(newNode)
  }

  const renderTree = (parentId: number, level = 0): React.JSX.Element => {
    const nodes = treeData.filter((node) => node.chpid === parentId)
    return (
      <ul className={` ${levelol[0][level]}`}>
        {nodes.map((node) => {
          const isEditing = editableRow?.id === node.id
          const children = treeData.filter((item) => item.chpid === node.id)
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
                      {children.length < 5 && (
                        <FaPlusCircle
                          className="text-xl cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddNode(node.id, level)
                          }}
                        />
                      )}
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
        title="جدول حساب ها"
        icons={[
          {
            icon: <MdCategory size={30} />,
            label: 'جدول حساب ها',
            destination: '/accounting/acctypes',
          },
          {
            icon: <HiDocumentPlus size={30} />,
            label: 'سند جدید',
            destination: '/accounting/add',
          },

          {
            icon: <HiClipboardDocumentList size={30} />,
            label: 'لیست اسناد',
            destination: '/accounting',
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
