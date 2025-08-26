import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState } from 'react'
import { Header } from '@/interfaces'

const DocHead = ({ onChange }: { onChange: (header: Header) => void }) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const [formHeader, setFormHeader] = useState<Record<string, string | number>>({
    Number: '',
    Date: today,
    Sequence: '',
    DailyNumber: '',
    Description: '',
  })

  const elementCreator = buildForm(
    formHeader,
    setFormHeader,
    (values) => {
      const header: Header = {
        BranchRef: 0,
        Date: values.Date,
        Number: parseInt(values.Number) || 0,
        Sequence: parseInt(values.Sequence) || 0,
        DailyNumber: parseInt(values.DailyNumber) || 0,
        VoucherTypeRef: 0,
        IsCurrencyBased: 0,
        Description: values.Description || '',
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
    }
  )

  return (
    <>
      <Divider title="مشخصات سربرگ سند" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fieldList.header.map((field, i) => (
          <div key={i}>{elementCreator(field)}</div>
        ))}
      </div>
    </>
  )
}

export default DocHead
