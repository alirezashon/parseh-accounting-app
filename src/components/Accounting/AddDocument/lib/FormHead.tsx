import Divider from '@/components/hub/Forms/Divider'
import { DocumentRow, FieldConfig, FieldKey, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState } from 'react'
import { Detail, Header } from '@/interfaces'

const DocHead = () => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  
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
  const elementCreator = buildForm(formHeader, setFormHeader)
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
