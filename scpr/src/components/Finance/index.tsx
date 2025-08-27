'use client'
import MainHead from '../Headers/MainHead'
import { useState } from 'react'
import MainLayout from '@/layouts/Main'
import EditableTable from '../Accounting/hub/DetailedBlankTable'
import { GiCardPick, GiCardRandom } from 'react-icons/gi'
import { PiCoinsFill } from 'react-icons/pi'
import { BsDatabaseFillAdd } from 'react-icons/bs'

const Finance = () => {
  const [activeTab, setActiveTab] = useState('همه')
  return (
    <MainLayout>
      <MainHead
        title="مالی "
        icons={[
          {
            icon: <GiCardPick size={30} />,
            label: 'لیست مالی',
            destination: '/finance',
          },
          {
            icon: <PiCoinsFill size={35} />,
            label: 'صندوق ها',
            destination: '/finance/cache',
          },
          {
            icon: <GiCardRandom size={30} />,
            label: ' بانک ها',
            destination: '/finance/banks',
          },
          {
            icon: <BsDatabaseFillAdd size={30} />,
            label: ' ایجاد',
            destination: '/finance/banks/add',
          },
          {
            icon: <BsDatabaseFillAdd size={30} />,
            label: ' ایجاد',
            destination: '/finance/banks/add',
          },
        ]}
      />

      <div className="relative w-full border-b border-gray-300 ">
        <div
          className={`flex ${
            'innerWidth < 777'.length ? 'relative h-12 overflow-hidden' : ''
          }`}
        >
          {['پرداخت ها', 'دریافت ها', ''].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex text-nowrap bg-white cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-all duration-200
                ${
                  activeTab === tab
                    ? 'border-b-2 border-[#2F27CE] text-[#2F27CE] bg-white z-10 shadow-md'
                    : 'border-b-2 border-transparent text-gray-500'
                }`}
              style={{
                marginRight: 'innerWidth < 777'.length && i !== 0 ? -5 : 0,
                position: 'innerWidth < 777'.length ? 'relative' : 'static',
              }}
            >
              {/* <span className='text-xl'>{tab.icon}</span> */}
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>
      <EditableTable
        searchMode
        rows={[
          {
            id: 1,
            code: '1001',
            currency: 'ریال',
            currencyAmount: '1404/05/10',
            amountIRR: 'پرداخت حقوق',
            city: '50,000,000',
            mobile: 'تسویه شده',
            phone: 'پروژه CRM',
            nationalId: 'دستی',
          },
          {
            id: 2,
            code: '1002',
            currency: 'دلار',
            currencyAmount: '1404/05/11',
            amountIRR: 'خرید سرور',
            city: '1,200',
            mobile: 'در انتظار تایید',
            phone: 'زیرساخت',
            nationalId: 'اتوماتیک',
          },
          {
            id: 3,
            code: '1003',
            currency: 'یورو',
            currencyAmount: '1404/05/12',
            amountIRR: 'فاکتور نرم‌افزار',
            city: '900',
            mobile: 'پرداخت نشده',
            phone: 'ERP',
            nationalId: 'دستی',
          },
          {
            id: 4,
            code: '1004',
            currency: 'ریال',
            currencyAmount: '1404/05/13',
            amountIRR: 'هزینه اینترنت',
            city: '3,500,000',
            mobile: 'تسویه شده',
            phone: 'زیرساخت',
            nationalId: 'اتوماتیک',
          },
          {
            id: 5,
            code: '1005',
            currency: 'ریال',
            currencyAmount: '1404/05/14',
            amountIRR: 'پیش‌پرداخت قرارداد',
            city: '15,000,000',
            mobile: 'در حال پردازش',
            phone: 'پروژه POS',
            nationalId: 'دستی',
          },
        ]}
        fields={[
          { key: 'code', label: 'کد', type: 'text' },
          { key: 'currency', label: 'ارجاع', type: 'text' },
          { key: 'currencyAmount', label: 'تاریخ', type: 'text' },
          { key: 'amountIRR', label: 'شرح', type: 'text' },
          { key: 'city', label: 'مبلغ', type: 'text' },
          { key: 'mobile', label: 'وضعیت', type: 'text' },
          { key: 'phone', label: 'پروژه', type: 'text' },
          { key: 'nationalId', label: 'دستی', type: 'text' },
        ]}
        onRowClick={(row) => console.log(row)}
        color={'#2F27CE'}
        className="mt-7 rounded-sm"
      />
    </MainLayout>
  )
}

export default Finance
