import Divider from '@/components/hub/Forms/Divider'
import { DocumentRow, FieldConfig, FieldKey, fieldList, treeData } from './data'
import { buildForm } from './ElementCreator'
import { useEffect, useMemo, useState } from 'react'
import { Detail } from '@/interfaces'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import Calendar from '@/components/hub/Calendar'
import Selectree from './Selectree/Tree'
import { getAllTreeData } from '@/components/Accounting/hub/AcctypesLevels/lib/convertors'
import { TreeChartInterface } from '@/components/Accounting/hub/AcctypesLevels/lib/data'
import { BalanceBadge } from '@/components/Accounting/hub/BalanceBadage'

const DocRows = ({ onChange }: { onChange: (result: Detail[]) => void }) => {
  const [documents, setDocuments] = useState<DocumentRow[]>(
    Array.from({ length: 25 }, () => ({
      account: '',
      detailed: '',
      description: '',
      debit: 0,
      credit: 0,
      followUpNumber: '',
      followUpDate: '',
    }))
  )
  const [formRows, setFormRows] = useState<Record<FieldKey, string>>({
    account: '',
    detailed: '',
    description: '',
    debit: '0',
    credit: '0',
    followUpNumber: '',
    followUpDate: '',
  })
  const [details, setDetails] = useState<Detail[]>(
    documents.map((row, index) => ({
      RowNumber: index + 1,
      AccountGroupRef: 0,
      GLRef: parseInt(row.account) || 0,
      SLRef: parseInt(row.detailed) || 0,
      SLCode: '',
      Debit: Number(row.debit) || 0,
      Credit: Number(row.credit) || 0,
      Description: row.description,
      Description_En: '',
      FollowUpNumber: row.followUpNumber,
      FollowUpDate: row.followUpDate,
      Quantity: 0,
      DLLevel4: '',
      DLLevel5: '',
      DLTypeRef4: 0,
      DLTypeRef5: 0,
      CurrencyRef: 0,
      TaxAccountType: 0,
      TaxStateType: 0,
      TransactionType: 0,
      PurchaseOrSale: 0,
      ItemOrService: 0,
      PartyRef: 0,
      TaxAmount: 0,
    }))
  )
  const [treesData, setTreesData] = useState<TreeChartInterface[]>([])
  useEffect(() => {
    getAllTreeData().then((response) => setTreesData(response))
  }, [])
  const totalDebit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.debit) || 0), 0),
    [documents]
  )
  const totalCredit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.credit) || 0), 0),
    [documents]
  )
  const isBalanced = totalDebit === totalCredit
  const elementCreator = buildForm(
    formRows,
    setFormRows,
    (changes: Record<string, string>) => {
      const row: Detail = {
        RowNumber: 1,
        AccountGroupRef: 0,
        GLRef: parseInt(changes.account) || 0,
        SLRef: parseInt(changes.detailed) || 0,
        SLCode: '',
        Debit: Number(changes.debit) || 0,
        Credit: Number(changes.credit) || 0,
        Description: changes.description,
        Description_En: '',
        FollowUpNumber: changes.followUpNumber,
        FollowUpDate: changes.followUpDate,
        Quantity: 0,
        DLLevel4: '',
        DLLevel5: '',
        DLTypeRef4: 0,
        DLTypeRef5: 0,
        CurrencyRef: 0,
        TaxAccountType: 0,
        TaxStateType: 0,
        TransactionType: 0,
        PurchaseOrSale: 0,
        ItemOrService: 0,
        PartyRef: 0,
        TaxAmount: 0,
      }

      onChange([row]) // چون فقط یک ردیفه، در آرایه می‌ذاریم
    }
  )

  const updateRow = <K extends keyof DocumentRow>(
    index: number,
    field: K,
    value: DocumentRow[K]
  ) => {
    setDocuments((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    )
  }

  const deleteRow = (index: number) =>
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  const addNewRow = () =>
    setDocuments((prev) => [
      ...prev,
      {
        account: '',
        detailed: '',
        description: '',
        debit: 0,
        credit: 0,
        followUpNumber: '',
        followUpDate: '',
      },
    ])

  const clearEmptyRows = () => {
    setDocuments((prev) =>
      prev.filter(
        (r) => r.debit || r.credit || r.description || r.account || r.detailed
      )
    )
  }

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
              <span>جمع بدهکار: {totalDebit.toLocaleString('fa-IR')}</span>
              <span>جمع بستانکار: {totalCredit.toLocaleString('fa-IR')}</span>
            </div>
          </div>

          {/* Body (scrollable) */}
          <div className="max-h-[560px] overflow-auto ">
            {documents.map((row, index) => (
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
                <div className="min-w-[200px] flex-1">
                  {/* <Selectree label={index === 0 ? 'کد معین' : ''} /> */}
                  <Selectree
                    label={index === 0 ? 'کد معین' : ''}
                    theme="my-theme"
                    treeData={treesData}
                    onUnselect={(allChildIds) => {
                      console.log('Unselected IDs:', allChildIds)
                    }}
                  />
                </div>
                <div className="min-w-[200px] flex-1">
                  <MultiSelectTrees
                    trees={treeData}
                    placeholder="کد تفضیلی"
                    label={index === 0 ? 'کد تفضیلی' : ''}
                    onSelect={(ids: string[]) =>
                      updateRow(index, 'detailed', ids?.[0] ?? '')
                    }
                  />
                </div>

                <div className="min-w-[160px] sm:min-w-[200px] flex-1">
                  <InputNumber
                    label={index === 0 ? 'بدهکار' : ''}
                    placeholder="بدهکار"
                    value={row.debit}
                    onChange={(val: number) => updateRow(index, 'debit', val)}
                  />
                </div>

                <div className="min-w-[160px] sm:min-w-[200px] flex-1">
                  <InputNumber
                    label={index === 0 ? 'بستانکار' : ''}
                    placeholder="بستانکار"
                    value={row.credit}
                    onChange={(val: number) => updateRow(index, 'credit', val)}
                  />
                </div>

                <div className="min-w-[200px] flex-1">
                  <Input
                    label={index === 0 ? 'شرح' : ''}
                    placeholder="شرح"
                    value={row.description}
                    onChange={(val: string) =>
                      updateRow(index, 'description', val)
                    }
                  />
                </div>

                <div className="min-w-[160px]">
                  <Input
                    label={index === 0 ? 'شماره پیگیری' : ''}
                    placeholder="شماره پیگیری"
                    value={row.followUpNumber}
                    onChange={(val: string) =>
                      updateRow(index, 'followUpNumber', val)
                    }
                  />
                </div>

                <div className="min-w-[160px]">
                  <Calendar
                    label={index === 0 ? 'تاریخ پیگیری' : ''}
                    placeholder="تاریخ پیگیری"
                    setDate={(iso: string) =>
                      updateRow(index, 'followUpDate', iso)
                    }
                  />
                </div>

                <div className="min-w-[200px] flex-1">
                  <SingleSelectList
                    label={index === 0 ? 'مرکز هزینه / پروژه' : ''}
                    items={[{ id: 'i', label: ' o' }]}
                    setSelectedItems={() => null}
                  />
                </div>
              </div>
            ))}
            {documents.map((row, index) => (
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
                <div className="max-h-[560px] overflow-auto  flex items-center transition hover:shadow-sm hover:bg-slate-50/60 ">
                  {([...fieldList.details] as FieldConfig[]).map((field, i) => (
                    <div key={i} className="">
                      {elementCreator(field, index !== 0)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default DocRows
