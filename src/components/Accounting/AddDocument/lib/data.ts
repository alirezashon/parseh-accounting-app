export interface Selectreetwo {
  id: string
  label: string
  children: { id: string; label: string }[]
}

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
    | 'multiselecttrees'
    | 'selectree'
  options?: string[] // برای select
  placeholder?: string
  min?: number
  max?: number
}
export type HeaderState<TKeys extends string> = Record<TKeys, string>
export type Update = (val: any) => void
export const fieldList = {
  header: [
    { key: 'Number', label: 'شماره سند', type: 'text' },
    { key: 'Date', label: 'تاریخ', type: 'calendar' },
    { key: 'Sequence', label: ' شماره فرعی', type: 'text' },
    { key: 'DailyNumber', label: 'شماره روزانه', type: 'text' },
    { key: 'Description', label: 'توضیحات', type: 'textarea' },
  ],
  details: [
    { key: 'refs', label: 'کد معین', type: 'selectree' },
    { key: 'DLLevel4', label: ' کد تفضیلی', type: 'select' },
    { key: 'Debit', label: 'بدهکار', type: 'number' },
    { key: 'Credit', label: 'بستانکار', type: 'number' },
    { key: 'Description', label: 'شرح ', type: 'text' },
    { key: 'FollowUpNumber', label: 'شماره پیگیری', type: 'text' },
    { key: 'FollowUpDate', label: 'تاریخ پیگیری', type: 'calendar' },
    { key: 'DLLevel5', label: 'مرکز هزینه / پروژه', type: 'select' },
  ],
}

export type FieldKey = (typeof fieldList.header)[number]['key']
