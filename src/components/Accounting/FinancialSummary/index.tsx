'use client'

import FormHead from '@/components/Headers/FormHead'

type RowItem = {
  name: string
  amount: string
}

const Table: React.FC<{ title: string; rows: RowItem[]; color: string }> = ({
  title,
  rows,
  color,
}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full overflow-hidden border border-gray-100'>
      <h3
        style={{ backgroundColor: color }}
        className='text-white text-base font-semibold py-3 text-center'
      >
        {title}
      </h3>
      <table className='w-full divide-y divide-gray-100'>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className='group cursor-pointer transition hover:bg-gray-50'
              onClick={() => alert(row.name)}
            >
              <td className='px-4 py-2 border border-gray-200 text-right text-gray-700 group-hover:text-black text-sm'>
                {row.name}
              </td>
              <td className='px-4 py-2 border border-gray-200 text-left text-gray-600 group-hover:text-black text-sm'>
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FinancialSummary: React.FC = () => {
  return (
    <>
      <FormHead />
      <div className='w-full max-w-7xl mx-auto bg-white border border-[#dbeafe] rounded-2xl px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Table
            title='دارایی ها'
            rows={[
              { name: 'بانک', amount: 'ریال ۰' },
              { name: 'صندوق', amount: 'ریال ۰' },
              { name: 'تنخواه گردان', amount: 'ریال ۰' },
              { name: 'موجودی کالا', amount: 'ریال ۰' },
              { name: 'بدهکاران', amount: 'ریال ۰' },
              { name: 'اسناد دریافتنی', amount: 'ریال ۰' },
              { name: 'اسناد در جریان وصول', amount: 'ریال ۰' },
              { name: 'سایر دارائی ها', amount: 'ریال ۰' },
              { name: 'مجموع', amount: 'ریال ۰' },
            ]}
            color='#27CE80'
          />
          <Table
            title='بدهی ها'
            rows={[
              { name: 'بستانکاران', amount: 'ریال ۰' },
              { name: 'اسناد پرداختنی', amount: 'ریال ۰' },
              { name: 'سایر بدهی ها', amount: 'ریال ۰' },
              { name: 'مجموع', amount: 'ریال ۰' },
            ]}
            color='#CE2746'
          />
          <Table
            title='حقوق صاحبان سهام'
            rows={[
              { name: 'سرمایه', amount: '(ریال ۳۴٬۲۳۴)' },
              { name: 'اندوخته قانونی', amount: 'ریال ۳۴٬۲۳۴' },
              { name: 'سود یا زیان انباشته (سنواتی)', amount: 'ریال ۰' },
              { name: 'سایر', amount: 'ریال ۰' },
              { name: 'مجموع', amount: 'ریال ۰' },
            ]}
            color='#2F27CE'
          />
        </div>
      </div>
    </>
  )
}

export default FinancialSummary
