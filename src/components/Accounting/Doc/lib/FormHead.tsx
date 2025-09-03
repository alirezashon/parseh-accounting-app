// import { FieldConfig } from './data'
// import { buildForm } from './ElementCreator'
// import { useMemo, useState, useEffect } from 'react'
// import Divider from '@/components/hub/Forms/Divider'
// import { VoucherList } from '@/interfaces'

// const DocHead = ({
//   data,
//   value,
//   onChange,
// }: {
//   data: FieldConfig[]
//   value: VoucherList
//   onChange: (header: VoucherList) => void
// }) => {
//   const today = useMemo(() => new Date().toISOString().split('T')[0], [])

//   const headerToForm = (h?: VoucherList) => ({
//     Number: h?.Number ?? '',
//     Date: h?.Date || today,
//     Sequence: h?.Sequence ?? '',
//     DailyNumber: h?.DailyNumber ?? '',
//     Description: h?.Description ?? '',
//   })

//   const [formHeader, setFormHeader] = useState<Record<string, string | number>>(
//     headerToForm(value)
//   )

//   // هر وقت prop از والد تغییر کرد، فرم را سینک کن (hydration بعد از رفرش)
//   useEffect(() => {
//     setFormHeader(headerToForm(value))
//   }, [value])

//   const elementCreator = buildForm<keyof typeof formHeader>({
//     state: formHeader,
//     setState: (nextState) => {
//       const resolved =
//         typeof nextState === 'function' ? nextState(formHeader) : nextState
//       setFormHeader(resolved)

//       const header: VoucherList = {
//         BranchRef: 0,
//         Date: String(resolved.Date || today),
//         Number: parseInt(String(resolved.Number)) || 0,
//         Sequence: parseInt(String(resolved.Sequence)) || 0,
//         DailyNumber: parseInt(String(resolved.DailyNumber)) || 0,
//         VoucherTypeRef: 0,
//         IsCurrencyBased: 0,
//         Description: String(resolved.Description || ''),
//         Description_En: '',
//         State: 0,
//         IsTemporary: 0,
//         IsExternal: 0,
//         ReferenceNumber: 0,
//         ShowCurrencyFields: 0,
//         IsReadonly: 0,
//         FiscalYearRef: 0,
//         VoucherID: 0,
//         LedgerRef: 0,
//         Version: '',
//         AuxiliaryNumber: '',
//         Creator: 0,
//         CreationDate: '',
//         LastModifier: 0,
//         LastModificationDate: '',
//         cust_id: 0,
//         sys_id: '',
//         sys_status: 0,
//         sys_st_date_pe_c: '',
//         sys_st_date_pe: '',
//         sys_st_date_en: '',
//         sys_type: 0,
//         sys_app: 0,
//       }
//       onChange(header)
//     },
//   })

//   return (
//     <>
//       <Divider title="مشخصات سربرگ سند" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {data.map((field, i) => (
//           <div key={i}>{elementCreator(field)}</div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default DocHead

'use client'

import { FieldConfig } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState, useEffect } from 'react'
import Divider from '@/components/hub/Forms/Divider'
import { VoucherList } from '@/interfaces'

const DocHead = ({
  data,
  value,
  onChange,
}: {
  data: FieldConfig[]
  value: VoucherList
  onChange: (header: VoucherList) => void
}) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  // مقدار اولیه: تمام فیلدهای VoucherList
  const [formHeader, setFormHeader] = useState<VoucherList>(value)

  // وقتی props تغییر کرد فرم را سینک کن
  useEffect(() => {
    setFormHeader(value)
  }, [value])

  const elementCreator = buildForm<keyof VoucherList>({
    state: formHeader,
    setState: (nextState) => {
      const resolved =
        typeof nextState === 'function' ? nextState(formHeader) : nextState

      // فیلدهای عددی‌ای که باید parse بشن
      const numericKeys: (keyof VoucherList)[] = [
        'VoucherID',
        'LedgerRef',
        'FiscalYearRef',
        'BranchRef',
        'Number',
        'Sequence',
        'DailyNumber',
        'VoucherTypeRef',
        'Creator',
        'LastModifier',
        'ReferenceNumber',
        'cust_id',
        'sys_status',
        'sys_type',
        'sys_app',
        'IsCurrencyBased',
        'IsTemporary',
        'IsExternal',
        'ShowCurrencyFields',
        'IsReadonly',
      ]

      const updatedHeader: VoucherList = {
        ...formHeader,
        ...Object.fromEntries(
          Object.entries(resolved).map(([key, value]) => {
            return numericKeys.includes(key as keyof VoucherList)
              ? [key, Number(value) || 0]
              : [key, value]
          })
        ),
      }

      setFormHeader(updatedHeader)
      onChange(updatedHeader)
    },
  })

  return (
    <>
      <Divider title="مشخصات سربرگ سند" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((field, i) => (
          <div key={i}>{elementCreator(field)}</div>
        ))}
      </div>
    </>
  )
}

export default DocHead
