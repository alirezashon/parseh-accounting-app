export const treeData = [
  {
    id: '1',
    label: 'دارایی ها',
    children: [
      { id: '2', label: 'دارایی های جاری' },
      { id: '25', label: 'دارایی های غیر جاری' },
    ],
  },
  {
    id: '40',
    label: 'بدهی ها',
    children: [
      { id: '41', label: 'بدهیهای جاری' },
      { id: '57', label: 'بدهیهای غیر جاری' },
    ],
  },
  {
    id: '63',
    label: 'حقوق صاحبان سهام',
    children: [{ id: '64', label: 'حقوق صاحبان سهام' }],
  },
  {
    id: '71',
    label: 'خرید',
    children: [
      { id: '72', label: 'خرید کالا' },
      { id: '73', label: 'برگشت از خرید' },
      { id: '74', label: 'تخفیفات نقدی خرید' },
    ],
  },
  {
    id: '75',
    label: 'فروش',
    children: [
      { id: '76', label: 'فروش کالا' },
      { id: '77', label: 'برگشت از فروش' },
      { id: '78', label: 'تخفیفات نقدی فروش' },
    ],
  },
  {
    id: '79',
    label: 'درآمد',
    children: [
      { id: '80', label: 'درآمد های عملیاتی' },
      { id: '85', label: 'درآمد های غیر عملیاتی' },
    ],
  },
  {
    id: '91',
    label: 'هزینه ها',
    children: [
      { id: '92', label: 'هزینه های پرسنلی' },
      { id: '111', label: 'هزینه های عملیاتی' },
      { id: '123', label: 'هزینه های استهلاک' },
      { id: '127', label: 'هزینه های بازاریابی و توزیع و فروش' },
      { id: '131', label: 'هزینه های غیرعملیاتی' },
    ],
  },
  {
    id: '138',
    label: 'سایر حساب ها',
    children: [
      { id: '139', label: 'حساب های انتظامی' },
      { id: '142', label: 'حساب های کنترلی' },
      { id: '144', label: 'حساب خلاصه سود و زیان' },
    ],
  },
]
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
    { key: 'Detailed', label: ' کد تفضیلی', type: 'multiselecttrees' },
    { key: 'Debit', label: 'بدهکار', type: 'number' },
    { key: 'Credit', label: 'بستانکار', type: 'number' },
    { key: 'Description', label: 'شرح ', type: 'text' },
    { key: 'FollowUpNumber', label: 'شماره پیگیری', type: 'text' },
    { key: 'FollowUpDate', label: 'تاریخ پیگیری', type: 'calendar' },
    { key: 'DLTypeRef5', label: 'مرکز هزینه / پروژه', type: 'select' },
  ],
}  

export type FieldKey = (typeof fieldList.header)[number]['key']
