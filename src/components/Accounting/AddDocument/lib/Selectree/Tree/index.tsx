// 'use client'
// import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
// import {
//   levelol,
//   TreeChartInterface,
// } from '@/components/Accounting/hub/AcctypesLevels/lib/data'
// import { useEffect, useRef, useState } from 'react'
// import {
//   FaChevronLeft,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaEdit,
//   FaPlusCircle,
// } from 'react-icons/fa'

// const Selectree = () => {
//   const [treeData, setTreeData] = useState<TreeChartInterface[]>([])
//   const [openTrees, setOpenTrees] = useState<number[]>([])
//   const [editableRow, setEditableRow] = useState<TreeChartInterface | null>(
//     null
//   )
//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchResults, setSearchResults] = useState<TreeChartInterface[]>([])
//   const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getAllTreeData()
//       setTreeData(data)
//     }
//     fetchData()
//   }, [])

//   const toggleNode = (id: number) => {
//     setOpenTrees((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     )
//   }

//   const handleSave = () => {
//     if (!editableRow) return
//     setTreeData((prev) =>
//       prev.map((item) =>
//         item.id === editableRow.id ? { ...item, ...editableRow } : item
//       )
//     )
//     setEditableRow(null)
//   }

//   const handleAddNode = (parentId: number, level: number) => {
//     const children = treeData.filter((item) => item.chpid === parentId)
//     if (children.length >= 5) return

//     const newId = Math.max(...treeData.map((x) => x.id)) + 1
//     const newNode: TreeChartInterface = {
//       id: newId,
//       chpid: parentId,
//       chtitle: 'زیرشاخه جدید',
//       chstatus: 1,
//       chlevel: level + 1,
//       lev1_count: 0,
//     }
//     setTreeData((prev) => [...prev, newNode])
//     setOpenTrees((prev) => [...new Set([...prev, parentId, newId])])
//     setEditableRow(newNode)
//   }

//   const getParentIds = (nodeId: number): number[] => {
//     const ids: number[] = []
//     let current = treeData.find((item) => item.id === nodeId)
//     while (current && current.chpid !== 0) {
//       ids.unshift(current.chpid)
//       current = treeData.find((item) => item.id === current!.chpid)
//     }
//     return ids
//   }

//   const handleSearch = (term: string) => {
//     setSearchTerm(term)
//     if (!term.trim()) {
//       setSearchResults([])
//       return
//     }
//     const lowerTerm = term.toLowerCase()
//     const results = treeData.filter((item) =>
//       item.chtitle.toLowerCase().includes(lowerTerm)
//     )
//     setSearchResults(results)
//   }

//   const focusNode = (node: TreeChartInterface) => {
//     const parentIds = getParentIds(node.id)
//     setOpenTrees((prev) => [...new Set([...prev, ...parentIds, node.id])])

//     setTimeout(() => {
//       const ref = nodeRefs.current[node.id]
//       if (ref) {
//         ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
//         ref.classList.add('ring-4', 'ring-blue-500', 'rounded-lg')
//         setTimeout(() => {
//           ref.classList.remove('ring-4', 'ring-blue-500', 'rounded-lg')
//         }, 2000)
//       }
//     }, 300)
//   }

//   const renderTree = (parentId: number, level = 0): React.JSX.Element => {
//     const nodes = treeData.filter((node) => node.chpid === parentId)
//     return (
//       <ul className={` ${levelol[0][level]}`}>
//         {nodes.map((node) => {
//           const isEditing = editableRow?.id === node.id
//           const children = treeData.filter((item) => item.chpid === node.id)

//           return (
//             <li key={node.id} className={`mx-5 px-4 py-3 ${levelol[1][level]}`}>
//               <div
//                 ref={(el) => {
//                   nodeRefs.current[node.id] = el
//                 }}
//                 className={`transition-all duration-300 flex items-center cursor-pointer ${levelol[3][level]} gap-3`}
//                 onClick={() => toggleNode(node.id)}
//               >
//                 <FaChevronLeft
//                   className={`transition-transform duration-300 ${
//                     openTrees.includes(node.id) ? '-rotate-90' : ''
//                   }`}
//                 />
//                 <div className="flex-1 flex flex-wrap items-center gap-3">
//                   {isEditing ? (
//                     <input
//                       className="border border-blue-400 text-sm rounded px-2 py-1 bg-white shadow-sm"
//                       value={editableRow?.chtitle || ''}
//                       onChange={(e) =>
//                         setEditableRow((prev) =>
//                           prev ? { ...prev, chtitle: e.target.value } : null
//                         )
//                       }
//                     />
//                   ) : (
//                     <span className="font-medium text-gray-800">
//                       {node.chtitle}
//                     </span>
//                   )}

//                   <span
//                     className={`text-xs px-3 py-1 rounded bg-blue-100 text-blue-700`}
//                   >
//                     {isEditing ? (
//                       <input
//                         className="bg-transparent text-center w-[80px]"
//                         defaultValue={node?.chlabel || ''}
//                         onChange={(e) =>
//                           setEditableRow((prev) =>
//                             prev ? { ...prev, chlabel: e.target.value } : null
//                           )
//                         }
//                       />
//                     ) : (
//                       node.chlabel || 'بدون برچسب'
//                     )}
//                   </span>

//                   {isEditing ? (
//                     <>
//                       <FaCheckCircle
//                         className="text-2xl text-green-500 cursor-pointer"
//                         onClick={handleSave}
//                       />
//                       <FaTimesCircle
//                         className="text-2xl text-red-500 cursor-pointer"
//                         onClick={() => setEditableRow(null)}
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <FaEdit
//                         className="text-xl text-gray-500 hover:text-blue-600 cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           setEditableRow(node)
//                         }}
//                       />
//                       {children.length < 5 && (
//                         <FaPlusCircle
//                           className="text-xl text-green-500 hover:text-green-600 cursor-pointer"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handleAddNode(node.id, level)
//                           }}
//                         />
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>

//               {openTrees.includes(node.id) && (
//                 <div className="pl-6">{renderTree(node.id, level + 1)}</div>
//               )}
//             </li>
//           )
//         })}
//       </ul>
//     )
//   }

//   return (
//     <div className="relative rounded-md p-4 shadow space-y-6 bg-white max-w-[1000px] mx-auto">
//       {/* Search Box */}
//       <div className="relative z-10 ">
//         <input
//           type="text"
//           placeholder="🔍 جستجوی زیرشاخه‌ها..."
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//         {searchResults.length > 0 && (
//           <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[300px] overflow-y-auto animate-slide-in">
//             {searchResults.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => focusNode(item)}
//                 className="cursor-pointer hover:bg-blue-100 px-4 py-2 text-sm"
//               >
//                 {item.chtitle}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="overflow-x-auto">{renderTree(0)}</div>
//     </div>
//   )
// }

// export default Selectree

'use client'
import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
import {
  levelol,
  TreeChartInterface,
} from '@/components/Accounting/hub/AcctypesLevels/lib/data'
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

const Selectree = () => {
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
    <div className="relative rounded-md p-4 shadow space-y-6 bg-white max-w-[800px] mx-auto">
      {/* Search Box */}
      <div className="relative z-10">
        <input
          type="text"
          placeholder="🔍 جستجوی زیرشاخه‌ها..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
