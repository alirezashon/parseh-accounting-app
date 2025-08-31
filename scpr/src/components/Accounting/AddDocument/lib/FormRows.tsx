import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { Detail } from '@/interfaces'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { BalanceBadge } from '@/components/Accounting/hub/BalanceBadage'
import { getAllTreeData } from '../../hub/AcctypesLevels/lib/convertors'
import { TreeChartInterface } from '../../hub/AcctypesLevels/lib/data'

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
  const [treeData, setTreeData] = useState<TreeChartInterface[]>([])
  const [documents, setDocuments] = useState<RowState[]>(
    Array.from({ length: 25 }, () => ({ ...EMPTY_ROW }))
  )

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

  useEffect(() => {
    const fetchData = async () => {
      await getAllTreeData().then((result) => {
        if (result as TreeChartInterface[]) setTreeData(result)
      })
    }
    // fetchData()
  }, [])

  const details = useMemo<Detail[]>(() => {
    const det = documents.map((row, index) => {
      const [accGroup, glRef, slRef] = String(row.refs || '')
        .split('|')
        .map((v) => parseInt(v) || 0)

      const detail: Detail = {
        RowNumber: index + 1,
        AccountGroupRef: accGroup || 0,
        GLRef: glRef || 0,
        SLRef: slRef || parseInt(String(row.Detailed)) || 0,
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

  useEffect(() => {
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
            console.debug('[DocRows] update row', {
              rowIndex,
              prevRow,
              nextRow,
            })
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
              const elementCreator = buildForm<keyof RowState>(
                row as Record<keyof RowState, string | number>,
                rowSetterFactory(index) as React.Dispatch<
                  React.SetStateAction<Record<keyof RowState, string | number>>
                >,
                undefined, // پدر را وسط تایپ صدا نزنیم
                treeData
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
                    {([...fieldList.details] as FieldConfig[]).map(
                      (field, i) => (
                        <div key={i} className="min-w-[200px] flex-1">
                          {elementCreator(field, index !== 0)}
                        </div>
                      )
                    )}
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
