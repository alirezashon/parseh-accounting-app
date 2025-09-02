import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { Detail, DetailedScheme } from '@/interfaces'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { BalanceBadge } from '@/components/Accounting/hub/BalanceBadage'
import {
  getAllTreeData,
  getSelectreeData,
} from '../../hub/AcctypesLevels/lib/convertors'
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

const shallowEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

const DocRows = ({
  value,
  onChange,
}: {
  value: Detail[]
  onChange: (result: Detail[]) => void
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [treeData, setTreeData] = useState<TreeChartInterface[]>([])
  const [detailed, setDetailed] = useState<DetailedScheme[]>([])
  const [documents, setDocuments] = useState<RowState[]>(
    Array.from({ length: 25 }, () => ({ ...EMPTY_ROW }))
  )

  // 🔒 هنگام سینک‌شدن از prop -> state، جلوی onChange را می‌گیریم
  const syncingFromProp = useRef(false)

  useEffect(() => {
    if (!Array.isArray(value)) return
    const rowsFromValue: RowState[] = value.map((d) => ({
      refs: [d.AccountGroupRef || 0, d.GLRef || 0, d.SLRef || 0].join('|'),
      Detailed: d.SLRef || '',
      Description: d.Description || '',
      Debit: d.Debit || 0,
      Credit: d.Credit || 0,
      FollowUpNumber: d.FollowUpNumber || '',
      FollowUpDate: d.FollowUpDate || '',
      DLTypeRef5: d.DLTypeRef5 || '',
    }))
    const padded = rowsFromValue.concat(
      Array.from({ length: Math.max(0, 25 - rowsFromValue.length) }, () => ({
        ...EMPTY_ROW,
      }))
    )

    // ✅ فقط اگر واقعاً تغییر کرده، آپدیت کن
    if (!shallowEqual(padded, documents)) {
      syncingFromProp.current = true
      setDocuments(padded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]) // عمداً documents را وارد نکردیم تا لوپ نسازیم

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
      const result = await getAllTreeData()
      if (result) setTreeData(result as TreeChartInterface[])
      const response = await getSelectreeData({ dlType: 0 })
      if (Array.isArray(response)) setDetailed(response)
    }
    fetchData()
  }, [])

  const details = useMemo<Detail[]>(() => {
    return documents
      .filter((r) => {
        const hasSomething =
          (Number(r.Debit) || 0) !== 0 ||
          (Number(r.Credit) || 0) !== 0 ||
          String(r.Description || '').trim() !== '' ||
          String(r.refs || '').trim() !== '' ||
          String(r.Detailed || '').trim() !== ''
        return hasSomething
      })
      .map((row, index) => {
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
  }, [documents])

  // ✅ فقط وقتی تغییر از کاربر بوده (نه از props) onChange را صدا بزن
  const lastSentRef = useRef<Detail[] | null>(null)
  useEffect(() => {
    if (syncingFromProp.current) {
      syncingFromProp.current = false
      lastSentRef.current = details
      return
    }
    if (lastSentRef.current && shallowEqual(lastSentRef.current, details))
      return
    onChange(details)
    lastSentRef.current = details
  }, [details, onChange])

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
            return nextRow as RowState
          })
        )
      },
    []
  )

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

  const singleSelectListData = useMemo(
    () => detailed.map((d) => ({ id: d.dl_id, label: d.dl_title })),
    [detailed]
  )

  const debitText = mounted
    ? new Intl.NumberFormat('fa-IR').format(totalDebit)
    : String(totalDebit)
  const creditText = mounted
    ? new Intl.NumberFormat('fa-IR').format(totalCredit)
    : String(totalCredit)

  return (
    <>
      <Divider title="سطرهای سند" state="" />
      <div className="rounded-2xl border-4 border-blue-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col h-full min-h-0">
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

            <div className="px-4 pb-2 text-xs text-slate-600 flex gap-4">
              <BalanceBadge isBalanced={isBalanced} />
              <span>تراز: {isBalanced ? 'متعادل' : 'نامتعادل'}</span>
              <span>جمع بدهکار: {debitText}</span>
              <span>جمع بستانکار: {creditText}</span>
            </div>
          </div>

          <div className="max-h-[560px] overflow-auto ">
            {documents.map((row, index) => {
              const elementCreator = buildForm<keyof RowState>({
                state: row as Record<keyof RowState, string | number>,
                setState: rowSetterFactory(index) as React.Dispatch<
                  React.SetStateAction<Record<keyof RowState, string | number>>
                >,
                treeData,
                singleSelectListData,
              })

              return (
                <div
                  key={index}
                  className="flex items-center transition hover:shadow-sm hover:bg-slate-50/60 "
                >
                  <div
                    onClick={() => deleteRow(index)}
                    className={`min-w-[40px] sticky flex justify-center ${
                      index === 0 ? 'translate-y-3' : ''
                    } cursor-pointer z-20 right-0 bg-white mx-1 text-red-600`}
                  >
                    <FaTrash size={16} />
                  </div>
                  <div className="max-h-[560px] flex items-center transition hover:shadow-sm hover:bg-slate-50/60 ">
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
