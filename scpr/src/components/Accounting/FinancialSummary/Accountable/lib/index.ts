export interface RowItem {
  name: string
  amount: string
}

export interface Section {
  title: string
  color: string
  rows: RowItem[]
}

export const tableData: Section[] = [
  {
    title: 'دارایی ها',
    color: '#32a827',
    rows: [
      { name: 'بانک', amount: 'ریال ۰' },
      { name: 'صندوق', amount: 'ریال ۰' },
      { name: 'تنخواه گردان', amount: 'ریال ۰' },
      { name: 'موجودی کالا', amount: 'ریال ۰' },
      { name: 'بدهکاران', amount: 'ریال ۰' },
      { name: 'اسناد دریافتنی', amount: 'ریال ۰' },
      { name: 'اسناد در جریان وصول', amount: 'ریال ۰' },
      { name: 'سایر دارائی ها', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
  {
    title: 'بدهی ها',
    color: '#CE2746',
    rows: [
      { name: 'بستانکاران', amount: 'ریال ۰' },
      { name: 'اسناد پرداختنی', amount: 'ریال ۰' },
      { name: 'سایر بدهی ها', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
  {
    title: 'حقوق صاحبان سهام',
    color: '#2F27CE',
    rows: [
      { name: 'سرمایه', amount: '(ریال ۳۴٬۲۳۴)' },
      { name: 'اندوخته قانونی', amount: 'ریال ۳۴٬۲۳۴' },
      { name: 'سود یا زیان انباشته (سنواتی)', amount: 'ریال ۰' },
      { name: 'سایر', amount: 'ریال ۰' },
      { name: 'مجموع', amount: 'ریال ۰' },
    ],
  },
]
