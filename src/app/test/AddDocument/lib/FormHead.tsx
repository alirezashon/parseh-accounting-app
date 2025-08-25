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
  })
  const elementCreator = buildForm(
    formHeader,
    setFormHeader,
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

      onChange({
        ...formData.header,
        Description: formHeader.description,
        Date: formHeader.date,
        ReferenceNumber: Number(formHeader.code) || 0,
      })
    }
  )

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
