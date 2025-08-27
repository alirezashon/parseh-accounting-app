// import Divider from '@/components/hub/Forms/Divider'
// import { FieldConfig, fieldList } from './data'
// import { buildForm } from './ElementCreator'
// import { useEffect, useMemo, useState } from 'react'
// import { Detail } from '@/interfaces'
// import { FaPlus, FaTrash } from 'react-icons/fa6'
// import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
// import { TreeChartInterface } from '@/components/Accounting/hub/AcctypesLevels/lib/data'
// import { BalanceBadge } from '@/components/Accounting/hub/BalanceBadage'

// const DocRows = ({ onChange }: { onChange: (result: Detail[]) => void }) => {
//   const [documents, setDocuments] = useState<Record<string, string | number>[]>(
//     Array.from({ length: 25 }, () => ({
//       refs: '',
//       Detailed: '',
//       Description: '',
//       Debit: 0,
//       Credit: 0,
//       FollowUpNumber: '',
//       FollowUpDate: '',
//       DLTypeRef5: '',
//     }))
//   )

//   const [details, setDetails] = useState<Detail[]>(
//     documents?.map((row, index) => {
//       const [accGroup, glRef, slRef] = String(row.refs || '')
//         .split('|')
//         .map((v) => parseInt(v) || 0)

//       return {
//         RowNumber: index + 1,
//         AccountGroupRef: accGroup || 0,
//         GLRef: glRef || 0,
//         SLRef: slRef || parseInt(String(row.detailed)) || 0,
//         SLCode: '',
//         Debit: Number(row.debit) || 0,
//         Credit: Number(row.credit) || 0,
//         Description: String(row.description),
//         Description_En: '',
//         FollowUpNumber: String(row.followUpNumber),
//         FollowUpDate: String(row.followUpDate),
//         Quantity: 0,
//         DLLevel4: '',
//         DLLevel5: '',
//         DLTypeRef4: 0,
//         DLTypeRef5: 0,
//         CurrencyRef: 0,
//         TaxAccountType: 0,
//         TaxStateType: 0,
//         TransactionType: 0,
//         PurchaseOrSale: 0,
//         ItemOrService: 0,
//         PartyRef: 0,
//         TaxAmount: 0,
//       }
//     })
//   )

//   const [detailRow, setDetailRow] = useState<Record<string, string | number>>({
//     refs: '',
//     Detailed: '',
//     Debit: '',
//     Credit: '',
//     Description: '',
//     FollowUpNumber: '',
//     FollowUpDate: '',
//     DLTypeRef5: '',
//   })
 
//   const totalDebit = useMemo(
//     () => documents.reduce((s, r) => s + (Number(r.debit) || 0), 0),
//     [documents]
//   )
//   const totalCredit = useMemo(
//     () => documents.reduce((s, r) => s + (Number(r.credit) || 0), 0),
//     [documents]
//   )
//   const isBalanced = totalDebit === totalCredit

//   const elementCreator = buildForm(detailRow, setDetailRow, (vals) => {
//     const row: Detail = {
//       RowNumber: 1,
//       GLRef: parseInt(vals.refs) || 0,
//       SLRef: parseInt(vals.Detailed) || 0,
//       Debit: parseFloat(vals.Debit) || 0,
//       Credit: parseFloat(vals.Credit) || 0,
//       Description: vals.Description,
//       FollowUpNumber: vals.FollowUpNumber,
//       FollowUpDate: vals.FollowUpDate,
//       AccountGroupRef: 0,
//       SLCode: '',
//       Description_En: '',
//       Quantity: 0,
//       DLLevel4: '',
//       DLLevel5: '',
//       DLTypeRef4: 0,
//       DLTypeRef5: parseInt(vals.DLTypeRef5) || 0,
//       CurrencyRef: 0,
//       TaxAccountType: 0,
//       TaxStateType: 0,
//       TransactionType: 0,
//       PurchaseOrSale: 0,
//       ItemOrService: 0,
//       PartyRef: 0,
//       TaxAmount: 0,
//     }
//     setDetails((prev) => [...prev, row]) 
//   })
//   useEffect(() => {
//     onChange(details)
//   }, [details])

//   const deleteRow = (index: number) =>
//     setDocuments((prev) => prev.filter((_, i) => i !== index))
//   const addNewRow = () =>
//     setDocuments((prev) => [
//       ...prev,
//       {
//         account: '',
//         detailed: '',
//         description: '',
//         debit: 0,
//         credit: 0,
//         followUpNumber: '',
//         followUpDate: '',
//       },
//     ])

//   const clearEmptyRows = () => {
//     setDocuments((prev) =>
//       prev.filter(
//         (r) => r.debit || r.credit || r.description || r.account || r.detailed
//       )
//     )
//   }

//   return (
//     <>
//       <Divider title="سطرهای سند" state="" />
//       <div className="rounded-2xl border-4 border-blue-100 bg-white shadow-sm overflow-hidden">
//         <div className="flex flex-col h-full min-h-0">
//           {/* Header (sticky) */}
//           <div className="sticky top-0 bg-white/80 backdrop-blur border-b-5 border-blue-300">
//             <div className="flex items-center gap-2 px-4 py-3">
//               <div className="text-slate-900 font-semibold text-sm">
//                 سطرهای سند
//               </div>
//               <div className="ms-auto flex items-center gap-2">
//                 <button
//                   onClick={addNewRow}
//                   className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-slate-100 text-slate-800 hover:bg-slate-200 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 >
//                   <FaPlus />
//                   افزودن سطر
//                 </button>
//                 <button
//                   onClick={clearEmptyRows}
//                   className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-red-400"
//                 >
//                   <FaTrash />
//                   حذف سطرهای خالی
//                 </button>
//               </div>
//             </div>

//             {/* نوار جمع‌ها */}
//             <div className="px-4 pb-2 text-xs text-slate-600 flex gap-4">
//               <BalanceBadge isBalanced={isBalanced} />
//               <span>جمع بدهکار: {totalDebit.toLocaleString('fa-IR')}</span>
//               <span>جمع بستانکار: {totalCredit.toLocaleString('fa-IR')}</span>
//             </div>
//           </div>

//           {/* Body (scrollable) */}
//           <div className="max-h-[560px] overflow-auto ">
//             {documents.map((row, index) => (
//               <div
//                 key={index}
//                 className="flex items-center transition hover:shadow-sm hover:bg-slate-50/60 "
//               >
//                 <div
//                   onClick={() => deleteRow(index)}
//                   className={`min-w-[40px]  sticky flex justify-center  ${
//                     index === 0 && ' translate-y-3 '
//                   } cursor-pointer z-20 right-0 bg-white mx-1 text-red-600 `}
//                 >
//                   <FaTrash size={16} />
//                 </div>
//                 <div className="max-h-[560px]  flex items-center transition hover:shadow-sm hover:bg-slate-50/60 ">
//                   {([...fieldList.details] as FieldConfig[]).map((field, i) => (
//                     <div key={i} className="min-w-[200px] flex-1">
//                       {elementCreator(field, index !== 0)}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default DocRows

import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { Detail } from '@/interfaces'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
import { TreeChartInterface } from '@/components/Accounting/hub/AcctypesLevels/lib/data'
import { BalanceBadge } from '@/components/Accounting/hub/BalanceBadage'

type RowState = {
  refs: string | number
  Detailed: string | number
  Description: string | number
  Debit: string | number
  Credit: string | number
  FollowUpNumber: string | number
  FollowUpDate: string | number
  DLTypeRef5: string | number
}

const EMPTY_ROW: RowState = {
  refs: '',
  Detailed: '',
  Description: '',
  Debit: 0,
  Credit: 0,
  FollowUpNumber: '',
  FollowUpDate: '',
  DLTypeRef5: '',
}

const DocRows = ({ onChange }: { onChange: (result: Detail[]) => void }) => {
  // ── 1) هر سطر state خودش را دارد
  const [documents, setDocuments] = useState<RowState[]>(
    Array.from({ length: 25 }, () => ({ ...EMPTY_ROW }))
  )

  // (اختیاری) اگر لازم شد
  const [treesData, setTreesData] = useState<TreeChartInterface[]>([])
  useEffect(() => {
    getAllTreeData().then((response) => setTreesData(response))
  }, [])

  // ── 2) جمع‌ها از روی documents (کلیدها یکدست: Debit/Credit)
  const totalDebit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.Debit) || 0), 0),
    [documents]
  )
  const totalCredit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.Credit) || 0), 0),
    [documents]
  )
  const isBalanced = totalDebit === totalCredit

  // ── 3) details را از روی documents مشتق کن (بدون setState)
  const details = useMemo<Detail[]>(() => {
    const det = documents.map((row, index) => {
      const [accGroup, glRef, slRef] = String(row.refs || '')
        .split('|')
        .map((v) => parseInt(v) || 0)

      const detail: Detail = {
        RowNumber: index + 1,
        AccountGroupRef: accGroup || 0,
        GLRef: glRef || 0,
        SLRef: slRef || (parseInt(String(row.Detailed)) || 0),
        SLCode: '',
        Debit: Number(row.Debit) || 0,
        Credit: Number(row.Credit) || 0,
        Description: String(row.Description || ''),
        Description_En: '',
        FollowUpNumber: String(row.FollowUpNumber || ''),
        FollowUpDate: String(row.FollowUpDate || ''),
        Quantity: 0,
        DLLevel4: '',
        DLLevel5: '',
        DLTypeRef4: 0,
        DLTypeRef5: parseInt(String(row.DLTypeRef5 || 0)) || 0,
        CurrencyRef: 0,
        TaxAccountType: 0,
        TaxStateType: 0,
        TransactionType: 0,
        PurchaseOrSale: 0,
        ItemOrService: 0,
        PartyRef: 0,
        TaxAmount: 0,
      }
      return detail
    })
    return det
  }, [documents])

  // ── 4) فقط وقتی details تغییر کرد، به پدر خبر بده
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onChange(details)
  }, [details])

  // ── 5) setter مخصوص هر سطر
  const rowSetterFactory = useCallback(
    (rowIndex: number) =>
      (action: React.SetStateAction<Record<string, string | number>>) => {
        setDocuments((prev) =>
          prev.map((row, i) => {
            if (i !== rowIndex) return row
            const prevRow = row as Record<string, string | number>
            const nextRow =
              typeof action === 'function'
                ? (action as (r: typeof prevRow) => typeof prevRow)(prevRow)
                : action
            console.debug('[DocRows] update row', { rowIndex, prevRow, nextRow })
            return nextRow as RowState
          })
        )
      },
    []
  )

  // ── 6) اکشن‌ها
  const deleteRow = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const addNewRow = () => {
    setDocuments((prev) => [...prev, { ...EMPTY_ROW }])
  }

  const clearEmptyRows = () => {
    setDocuments((prev) =>
      prev.filter((r) => {
        const hasSomething =
          (Number(r.Debit) || 0) !== 0 ||
          (Number(r.Credit) || 0) !== 0 ||
          String(r.Description || '').trim() !== '' ||
          String(r.refs || '').trim() !== '' ||
          String(r.Detailed || '').trim() !== ''
        return hasSomething
      })
    )
  }

  // ── 7) رندر
  return (
    <>
      <Divider title="سطرهای سند" state="" />
      <div className="rounded-2xl border-4 border-blue-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col h-full min-h-0">
          {/* Header (sticky) */}
          <div className="sticky top-0 bg-white/80 backdrop-blur border-b-5 border-blue-300">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="text-slate-900 font-semibold text-sm">
                سطرهای سند
              </div>
              <div className="ms-auto flex items-center gap-2">
                <button
                  onClick={addNewRow}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-slate-100 text-slate-800 hover:bg-slate-200 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <FaPlus />
                  افزودن سطر
                </button>
                <button
                  onClick={clearEmptyRows}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FaTrash />
                  حذف سطرهای خالی
                </button>
              </div>
            </div>

            {/* نوار جمع‌ها */}
            <div className="px-4 pb-2 text-xs text-slate-600 flex gap-4">
              <BalanceBadge isBalanced={isBalanced} />
              <span>تراز: {isBalanced ? 'متعادل' : 'نامتعادل'}</span>
              <span>جمع بدهکار: {totalDebit.toLocaleString('fa-IR')}</span>
              <span>جمع بستانکار: {totalCredit.toLocaleString('fa-IR')}</span>
            </div>
          </div>

          {/* Body (scrollable) */}
          <div className="max-h-[560px] overflow-auto ">
            {documents.map((row, index) => {
              // 👇 نکتهٔ مهم: از keyof RowState استفاده کن تا TS راضی باشه
              const elementCreator = buildForm<keyof RowState>(
                row as Record<keyof RowState, string | number>,
                rowSetterFactory(index) as React.Dispatch<
                  React.SetStateAction<Record<keyof RowState, string | number>>
                >,
                undefined // پدر را وسط تایپ صدا نزنیم
              )

              return (
                <div
                  key={index}
                  className="flex items-center transition hover:shadow-sm hover:bg-slate-50/60 "
                >
                  <div
                    onClick={() => deleteRow(index)}
                    className={`min-w-[40px]  sticky flex justify-center  ${
                      index === 0 && ' translate-y-3 '
                    } cursor-pointer z-20 right-0 bg-white mx-1 text-red-600 `}
                  >
                    <FaTrash size={16} />
                  </div>
                  <div className="max-h-[560px]  flex items-center transition hover:shadow-sm hover:bg-slate-50/60 ">
                    {([...fieldList.details] as FieldConfig[]).map((field, i) => (
                      <div key={i} className="min-w-[200px] flex-1">
                        {elementCreator(field, index !== 0)}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DocRows
