import { FieldConfig } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState, useEffect } from 'react'
import { Header } from '@/interfaces'
import Divider from '@/components/hub/Forms/Divider'

const DocHead = ({
  data,
  value,
  onChange,
}: {
  data: FieldConfig[]
  value: Header
  onChange: (header: Header) => void
}) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const headerToForm = (h?: Header) => ({
    Number: h?.Number ?? '',
    Date: h?.Date || today,
    Sequence: h?.Sequence ?? '',
    DailyNumber: h?.DailyNumber ?? '',
    Description: h?.Description ?? '',
  })

  const [formHeader, setFormHeader] = useState<Record<string, string | number>>(
    headerToForm(value)
  )

  // هر وقت prop از والد تغییر کرد، فرم را سینک کن (hydration بعد از رفرش)
  useEffect(() => {
    setFormHeader(headerToForm(value))
  }, [value])

  const elementCreator = buildForm<keyof typeof formHeader>({
    state: formHeader,
    setState: (nextState) => {
      const resolved =
        typeof nextState === 'function' ? nextState(formHeader) : nextState
      setFormHeader(resolved)

      const header: Header = {
        BranchRef: 0,
        Date: String(resolved.Date || today),
        Number: parseInt(String(resolved.Number)) || 0,
        Sequence: parseInt(String(resolved.Sequence)) || 0,
        DailyNumber: parseInt(String(resolved.DailyNumber)) || 0,
        VoucherTypeRef: 0,
        IsCurrencyBased: 0,
        Description: String(resolved.Description || ''),
        Description_En: '',
        State: 0,
        IsTemporary: 0,
        IsExternal: 0,
        ReferenceNumber: 0,
        ShowCurrencyFields: 0,
        IsReadonly: 0,
        FiscalYearRef: 0,
        Signature: '',
      }
      onChange(header)
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
