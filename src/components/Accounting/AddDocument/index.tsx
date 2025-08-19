'use client'
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import MainHead from '@/components/Headers/MainHead'
import Calendar from '@/components/hub/Calendar'
import Divider from '@/components/hub/Forms/Divider'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import { Detail, Header } from '@/interfaces'
import { FaTrash, FaPlus } from 'react-icons/fa6'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'
import { treeData } from './lib/data'
import { FaTimes } from 'react-icons/fa'

export type FieldConfig = {
  key: string
  label?: string
  type:
    | 'text'
    | 'date'
    | 'textarea'
    | 'select'
    | 'number'
    | 'calendar'
    | 'singleselect'
    | 'multiselecttrees'
  options?: string[] // برای select
  placeholder?: string
  min?: number
  max?: number
}

type HeaderState<TKeys extends string> = Record<TKeys, any>

type Update = (val: any) => void

export function makeKhaleFormJozi<TKeys extends string>(
  state: HeaderState<TKeys>,
  setState: React.Dispatch<React.SetStateAction<HeaderState<TKeys>>>
) {
  return function khaleFormJozi(cfg: FieldConfig) {
    const { key, label = '', type, options = [], placeholder } = cfg
    const value = state[key as TKeys]
    const update: Update = (val) =>
      setState((prev) => ({ ...prev, [key]: val }))

    let control: React.ReactNode = null
    switch (type) {
      case 'text':
      case 'date':
        control = (
          <Input
            label={label}
            value={value ?? ''}
            onChange={update}
            placeholder={placeholder}
            className="w-full"
          />
        )
        break
      case 'textarea':
        control = (
          <TextArea
            label={label}
            value={value ?? ''}
            onChange={update}
            placeholder={placeholder}
          />
        )
        break
      case 'select':
        control = (
          <SingleSelectList
            label={label}
            items={options.map((o, i) => ({ id: i, label: o }))}
            setSelectedItems={(id: number | string) =>
              update(options[id as number])
            }
          />
        )
        break
      case 'number':
        control = (
          <InputNumber
            label={label}
            value={Number(value) || 0}
            onChange={update}
            placeholder={placeholder || '0'}
          />
        )
        break
      case 'calendar':
        control = (
          <Calendar
            label={label}
            placeholder={placeholder}
            setDate={(iso: string) => update(iso)}
          />
        )
        break
      case 'singleselect':
        control = (
          <SingleSelectList
            label={label}
            items={(options || []).map((o, i) => ({ id: i, label: o }))}
            setSelectedItems={(id: number | string) =>
              update(options![id as number])
            }
          />
        )
        break
      case 'multiselecttrees':
        control = (
          <MultiSelectTrees
            trees={treeData}
            placeholder={placeholder || label}
            label={label}
            onSelect={(ids: string[]) => update(ids)}
          />
        )
        break
      default:
        control = null
    }

    return <div className="hamghzis w-full">{control}</div>
  }
}

/** HoverModal
 * مودال سبک که با هاور روی trigger باز می‌شود؛ با خروج موس، ESC، کلیک روی بیرون یا دکمه ضربدر بسته می‌شود.
 * هنگام بازشدن، صفحه به اندازه ارتفاع مودال به پایین اسکرول می‌کند (در صورت نیاز کاربر).
 * برای اطمینان از بالاتر بودن، در پرتال body با z-50 رندر می‌شود.
 */
export function HoverModal({
  trigger,
  children,
  widthClass = 'max-w-xl w-full',
  dir = 'rtl',
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  widthClass?: string
  dir?: 'rtl' | 'ltr'
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  // بازشدن با هاور
  const onEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setOpen(true)
  }
  const onLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  // بستن با ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // اسکرول به اندازه مودال هنگام باز شدن
  useLayoutEffect(() => {
    if (open && modalRef.current) {
      const h = modalRef.current.offsetHeight || 0
      window.scrollBy({ top: h, behavior: 'smooth' })
    }
  }, [open])

  // موقعیت‌دهی نزدیک trigger
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  )
  useLayoutEffect(() => {
    if (!open) return
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // نمایش دقیقاً پایین-چپِ trigger در صفحه (با درنظر گرفتن اسکرول)
    setCoords({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    })
  }, [open])

  // رندر پرتال مودال
  const modal =
    open && coords
      ? ReactDOM.createPortal(
          <div
            dir={dir}
            className="fixed inset-0 z-50"
            aria-modal="true"
            role="dialog"
          >
            {/* کلیک بیرون برای بستن */}
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <div
              ref={modalRef}
              style={{ top: coords.top, left: coords.left }}
              className={`absolute ${widthClass} rounded-2xl border border-slate-200 bg-white shadow-xl p-4`}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <button
                aria-label="بستن"
                onClick={() => setOpen(false)}
                className="absolute -top-3 -end-3 inline-flex items-center justify-center rounded-full bg-white shadow p-2 text-slate-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <FaTimes />
              </button>
              {children}
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <div
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {trigger}
      {modal}
    </div>
  )
}

// =============== نمونه استفاده داخل فرم شما ==================
const fieldList = [
  { key: 'code', label: 'شماره سند', type: 'text' },
  { key: 'date', label: 'تاریخ', type: 'date' },
  { key: 'description', label: 'توضیحات', type: 'textarea' },
] as const

type FieldKey = (typeof fieldList)[number]['key']

interface DocumentRow {
  account: string // GLRef
  detailed: string // SLRef
  description: string
  debit: number
  credit: number
  followUpNumber: string
  followUpDate: string // ISO date (yyyy-mm-dd)
}

export default function AddDocument() {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const [formHeader, setFormHeader] = useState<Record<FieldKey, string>>({
    code: '',
    date: today,
    description: '',
  })

  const [formData, setFormData] = useState<{
    header: Header
    details: Detail[]
  }>({
    header: {
      BranchRef: 0,
      Date: today,
      VoucherTypeRef: 0,
      IsCurrencyBased: 0,
      Description: '',
      Description_En: '',
      State: 0,
      IsTemporary: 0,
      IsExternal: 0,
      ReferenceNumber: 0,
      ShowCurrencyFields: 0,
      IsReadonly: 0,
      FiscalYearRef: 0,
      Signature: '',
    },
    details: [],
  })

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

  // سازنده رندر فیلدها (نسخه جنریک جدید)
  const khaleFormJozi = makeKhaleFormJozi(formHeader, setFormHeader)

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

  const totalDebit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.debit) || 0), 0),
    [documents]
  )
  const totalCredit = useMemo(
    () => documents.reduce((s, r) => s + (Number(r.credit) || 0), 0),
    [documents]
  )
  const isBalanced = totalDebit === totalCredit

  const handleSubmit = () => {
    const mappedDetails: Detail[] = documents.map((row, index) => ({
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

    const fullData: { header: Header; details: Detail[] } = {
      header: {
        ...formData.header,
        Description: formHeader.description,
        Date: formHeader.date,
        ReferenceNumber: Number(formHeader.code) || 0,
      },
      details: mappedDetails,
    }

    console.log('🔄 Sending Document:', fullData)
  }

  return (
    <div dir="rtl" className="grid gap-8 ">
      <MainHead
        title="ایجاد سند"
        icons={[
          {
            icon: <HiDocumentPlus size={28} />,
            label: 'سند جدید',
            destination: '/accounting/add',
          },
          {
            icon: <MdCategory size={28} />,
            label: 'جدول حساب‌ها',
            destination: '/accounting/acctypes',
          },
          {
            icon: <HiClipboardDocumentList size={28} />,
            label: 'لیست اسناد',
            destination: '/accounting',
          },
        ]}
      />

      {/* مشخصات سربرگ */}
      <Divider title="مشخصات سربرگ سند" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([...fieldList] as FieldConfig[]).map((field, i) => (
          <div key={i}>{khaleFormJozi(field)}</div>
        ))}
      </div>

      {/* پنل سطرهای سند با هدر چسبان داخلی */}
      <Divider title="سطرهای سند" state='' />

      <div className="rounded-2xl border-4 border-blue-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col h-full min-h-0">
          {/* Header (sticky) */}
          <div className="sticky top-0 bg-white/80 backdrop-blur border-b-5 border-blue-300">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="text-slate-900 font-semibold text-sm">
                سطرهای سند
              </div>
              <div className="ms-auto flex items-center gap-2">
                {/* نمونه استفاده از HoverModal روی دکمه افزودن سطر */}
                <HoverModal
                  trigger={
                    <button
                      onClick={addNewRow}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-slate-100 text-slate-800 hover:bg-slate-200 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <FaPlus />
                      افزودن سطر
                    </button>
                  }
                >
                  <div className="space-y-2 text-sm">
                    <div className="font-semibold">راهنمای سریع افزودن سطر</div>
                    <ul className="list-disc pe-4 space-y-1 text-slate-700">
                      <li>برای انتخاب کد معین/تفضیلی از درخت استفاده کنید.</li>
                      <li>برای حرکت سریع، از Tab و Shift+Tab استفاده کنید.</li>
                      <li>جمع بدهکار و بستانکار باید برابر باشد.</li>
                    </ul>
                  </div>
                </HoverModal>

                <button
                  onClick={clearEmptyRows}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FaTrash />
                  حذف سطرهای خالی
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  ثبت سند
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
          <div className="max-h-[560px] overflow-auto p-3 sm:p-4">
            {documents.map((row, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-xl transition shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-sm hover:bg-slate-50/60 border border-transparent hover:border-slate-100"
              >
                <div className="min-w-[200px] flex-1">
                  <MultiSelectTrees
                    trees={treeData}
                    placeholder="کد معین"
                    label={index === 0 ? 'کد معین' : ''}
                    onSelect={(ids: string[]) =>
                      updateRow(index, 'account', ids?.[0] ?? '')
                    }
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

                <button
                  onClick={() => deleteRow(index)}
                  className="ms-auto inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="حذف سطر"
                  title="حذف سطر"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BalanceBadge({ isBalanced }: { isBalanced: boolean }) {
  return (
    <span
      className={`${
        isBalanced ? 'text-emerald-600' : 'text-rose-600'
      } font-medium`}
    >
      {isBalanced ? 'تراز: متعادل' : 'تراز: نامتعادل'}
    </span>
  )
}
