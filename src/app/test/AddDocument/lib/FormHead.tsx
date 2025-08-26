import Divider from '@/components/hub/Forms/Divider'
import { FieldConfig, fieldList } from './data'
import { buildForm } from './ElementCreator'
import { useMemo, useState } from 'react'
import { Detail, Header } from '@/interfaces'

const DocHead = ({ onChange }: { onChange: (headers: Header) => void }) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const [formHeader, setFormHeader] = useState<Record<string, FieldConfig>>({
    Number: {
      key: 'Number',
      type: 'text',
    },
    Date: {
      key: 'Date',
      type: 'calendar',
    },
    Sequence: {
      key: 'Sequence',
      type: 'text',
    },
    DailyNumber: {
      key: 'DailyNumber',
      type: 'number',
    },
    Description: {
      key: 'Description',
      type: 'textarea',
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
      onChange)
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
