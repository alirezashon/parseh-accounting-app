import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, FieldKey, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState } from 'react'
import { Detail, Header } from '@/interfaces'

const DocHead = ({ onChange }: { onChange: (headers: Header) => void }) => {
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
  const elementCreator = buildForm(formHeader, (formHead) => {
    setFormHeader(formHead)
    onChange({
      ...formData.header,
      Description: formHeader.description,
      Date: formHeader.date,
      ReferenceNumber: Number(formHeader.code) || 0,
    })
  })

  return (
    <>
      <Divider title="مشخصات سربرگ سند" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([...fieldList.header] as FieldConfig[]).map((field, i) => (
          <div key={i}>{elementCreator(field)}</div>
        ))}
      </div>
    </>
  )
}
export default DocHead
