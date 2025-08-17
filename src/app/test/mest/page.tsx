// 'use client'

// import { useState } from 'react'
// import { getCookieByKey } from '@/actions/cookieToken'
// import { TreeChartInterface } from '@/components/Accounting/hub/AcctypesLevels/lib/data'
// export interface TreeNode {
//   id: string
//   name: string
//   level: number
//   children?: TreeNode[]
// }

// const ReferralLevels: React.FC = () => {
//   const [addModal, setAddModal] = useState<{
//     show: boolean
//     data?: TreeChartInterface
//   }>()
//   const [openTrees, setOpenTrees] = useState<number[]>([])
//   const [TreeChartInterface, setTreeChartInterface] = useState([])
//   const [editableRow, setEditableRow] = useState<TreeChartInterface | null>()
//   const colors = [
//     'text-purple-800',
//     'text-blue-800',
//     'text-yellow-600',
//     'text-green-800',
//     'text-red-700',
//   ]
//   const labels = [
//     'bg-purple-200',
//     'bg-blue-200',
//     'bg-yellow-200',
//     'bg-green-200',
//     'bg-red-200',
//   ]
//   const renderTree = (parentId: number, level = 0) => {
//     const nodes =
//       Array.isArray(TreeChartInterface) &&
//       TreeChartInterface?.filter((node) => node.chpid === parentId)
//     const EditChart = async () => {
//       const accessToken = await getCookieByKey('access_token')
//       const { chpid, chtitle, chstatus, chlabel } =
//         editableRow as TreeChartInterface
//     //   await EditReferrerChart({
//     //     accessToken,
//     //     chid: parseInt(`${editableRow?.id}`),
//     //     chpid,
//     //     chtitle,
//     //     chlabel: chlabel || '',
//     //     chstatus,
//     //   }).then(async (result) => {
//     //     if (result)
//     //       await getReferrerChart().then((value) => {
//     //         if (value) {
//     //           setTreeChartInterface(value)
//     //           setEditableRow(null)
//     //         }
//     //       })
//     //   })
//     }
//     return (
//       <ul className="pr-2 border-r-2 border-gray-300 rounded-b-2xl">
//         {Array.isArray(nodes) &&
//           nodes?.map((node) => (
//             <li key={node.id} className={`mb-4`}>
//               <div
//                 onClick={() =>
//                   setOpenTrees((prev) =>
//                     prev.includes(node.id)
//                       ? prev.filter((nodeId) => nodeId !== node.id)
//                       : [...prev, node.id]
//                   )
//                 }
//                 className={`flex items-center  p-2 ${
//                   node.chlevel !== 3 && 'pr-5'
//                 } rounded-lg ${colors[level % colors.length]}`}
//               >
//                 {
//                   // node.lev1_count > 0 &&
//                   <ArrowLeft2
//                     size={24}
//                     color="#98A2B3"
//                     className={`transition-all duration-500 cursor-pointer ${
//                       openTrees?.includes(node?.id) && '-rotate-90'
//                     }`}
//                   />
//                 }
//                 <div className="flex-1 flex gap-5 items-center">
//                   {editableRow && editableRow?.id === node.id ? (
//                     <div className="flex items-center gap-5">
//                       <input
//                         value={editableRow?.chtitle || ''} // مقدار اولیه را خالی نگه می‌داریم
//                         onChange={(e) =>
//                           setEditableRow(
//                             (prv) =>
//                               prv && {
//                                 ...prv,
//                                 chtitle: e.target.value,
//                               }
//                           )
//                         }
//                       />
//                     </div>
//                   ) : (
//                     <span className="cursor-pointer">{node.chtitle}</span>
//                   )}
//                   <span
//                     className={`${
//                       labels[level % labels.length]
//                     } min-w-16 px-2 py-[2px] rounded-md text-[12px] text-center min-h-4`}
//                   >
//                     {editableRow?.id === node.id ? (
//                       <input
//                         defaultValue={node?.chlabel || ''}
//                         onChange={(e) =>
//                           setEditableRow(
//                             (prv) =>
//                               prv && {
//                                 ...prv,
//                                 chlabel: e.target.value,
//                               }
//                           )
//                         }
//                         className="max-w-32 px-2 rounded-md text-center border-none bg-transparent"
//                       />
//                     ) : (
//                       node?.chlabel
//                     )}
//                   </span>
//                   {editableRow?.id === node.id && (
//                     <div className="flex gap-1">
//                       <TickCircle
//                         cursor={'pointer'}
//                         size={24}
//                         color="#0F973D"
//                         onClick={EditChart}
//                       />
//                       <CloseCircle
//                         cursor={'pointer'}
//                         size={24}
//                         color="#D42620"
//                         onClick={() => setEditableRow(null)}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   className="ml-2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setEditableRow(node)}
//                 >
//                   <Edit size={24} color="#7747C0" />
//                 </button>
//                 <button className="ml-2 text-gray-500 hover:text-gray-700">
//                   <AddCircle
//                     size={24}
//                     color="#7747C0"
//                     onClick={() => setAddModal({ show: true, data: node })}
//                   />
//                 </button>
//               </div>
//               <div className={`pr-9`}>
//                 {openTrees.includes(node.id) && renderTree(node.id, level + 1)}
//               </div>
//             </li>
//           ))}
//       </ul>
//     )
//   }
//   return (
//     <div className="m-4">
//       <div className="flex justify-between items-center mb-7">
//         <p className="cursor-pointer">
//           <span
//             className="text-[#98A2B3]"
//             onClick={() => {
//               setMenu('mygroups')
//               location.hash = 'mygroups'
//             }}
//           >
//             تنظیمات
//           </span>
//           /
//           <span
//             className="text-[#7747C0]"
//             onClick={() => {
//               setMenu('productgroups')
//               location.hash = 'productgroups'
//             }}
//           >
//             مدیریت سطوح بازاریابی
//           </span>
//         </p>
//         <button
//           type="submit"
//           onClick={() => setAddModal({ show: true })}
//           className="h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800"
//         >
//           + ایجاد بالاترین سطح
//         </button>
//       </div>

//       {addModal?.show && (
//         <AddModal
//           close={() => setAddModal({ show: false })}
//           data={addModal.data}
//         />
//       )}
//       <div className="bg-white p-6 border rounded-md">{renderTree(0)}</div>
//     </div>
//   )
// }
// export default ReferralLevels

'use client'
import AcctypesLevels from '@/components/Accounting/hub/AcctypesLevels'
import { useEffect, useRef, useState } from 'react'

export interface TreeNode {
  id: number
  chpid: number
  chtitle: string
}

interface TreeSelectListProps {
  label?: string
  treeData: TreeNode[]
  value?: number | null
  onChange: (id: number) => void
}

const TreeSelectList: React.FC<TreeSelectListProps> = ({
  label = 'انتخاب آیتم',
  treeData,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
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
    const flat = flattenTree(treeData)
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

  const filterData = (text: string) => {
    setSearchValue(text)
    const allItems = flattenTree(treeData)
    setFilteredItems(
      allItems.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

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
        // <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow max-h-60 overflow-y-auto">
        //   <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
        //     <input
        //       type="text"
        //       placeholder="جستجو..."
        //       value={searchValue}
        //       onChange={(e) => filterData(e.target.value)}
        //       className="w-full border border-blue-200 px-3 py-1 text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        //     />
        //   </div>
        //   <div>
        //     {filteredItems.map((item) => (
        //       <div
        //         key={item.id}
        //         onClick={() => {
        //           onChange(item.id)
        //         //   setIsOpen(false)
        //         }}
        //         className={`px-4 py-2 cursor-pointer text-sm hover:bg-blue-100 ${
        //           value === item.id
        //             ? 'bg-blue-100 text-blue-700 font-semibold'
        //             : ''
        //         }`}
        //       >
        //         {item.label}
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow max-h-60 overflow-y-auto">
     {
        <Selectree />
     }
        </div>
      )}
    </div>
  )
}

// export default TreeSelectList
 
import Selectree from './Tree'
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
      treeData={treeData}
      value={selected}
      onChange={setSelected}
    />
  )
}

export default page
