'use client'
import MainHead from '../Headers/MainHead'
import EditableTable from './hub/DetailedBlankTable'
import { useState } from 'react'
import { MdCategory } from 'react-icons/md'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import MainLayout from '@/layouts/Main'

const Accounting = () => {
  const [activeTab, setActiveTab] = useState('همه')
  const router = useRouter()
  return (
    <MainLayout>
      <MainHead
        title="لیست اسناد"
        icons={[
          {
            icon: <HiClipboardDocumentList size={30} />,
            label: 'لیست اسناد',
            destination: '/accounting',
          },
          {
            icon: <HiDocumentPlus size={30} />,
            label: 'سند جدید',
            destination: '/accounting/add',
          },
          {
            icon: <MdCategory size={30} />,
            label: 'جدول حساب ها',
            destination: '/accounting/acctypes',
          },
        ]}
      />

      <div className="relative w-full border-b border-gray-300 ">
        <div
          className={`flex ${
            'innerWidth < 777'.length ? 'relative h-12 overflow-hidden' : ''
          }`}
        >
          {['همه', 'پیش نویس', 'تایید شده', 'دستی', 'اتوماتیک'].map(
            (tab, i) => (
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
                  marginRight: 'innerWidth < 777'.length && i !== 0 ? -25 : 0,
                  position: 'innerWidth < 777'.length ? 'relative' : 'static',
                }}
              >
                {/* <span className='text-xl'>{tab.icon}</span> */}
                <span>{tab}</span>
              </button>
            )
          )}
        </div>
      </div>
      <EditableTable
        searchMode
        rows={Array.from({ length: 24 }, (_, i) => ({
          id: i,
          code: '100' + i,
          currency: activeTab + 'شرکتلی',
          currencyAmount: 'ایران',
          amountIRR: 'تهران',
          city: 'تهران',
          mobile: '09120000001',
          phone: '02112345678',
          nationalId: '1234567890',
          economicCode: '9876543210',
          registrationNumber: '555666',
          email: 'ali@example.com',
          isActive: 'بله',
          birthDate: '1370/01/01',
          joinDate: '1400/01/01',
        }))}
        fields={[
          { key: 'code', label: 'کد', type: 'text' },
          { key: 'currency', label: 'ارجاع', type: 'text' },
          { key: 'currencyAmount', label: 'تاریخ', type: 'text' },
          { key: 'amountIRR', label: 'شرح', type: 'text' },
          { key: 'city', label: 'مبلغ', type: 'text' },
          { key: 'mobile', label: 'وضعیت', type: 'text' },
          { key: 'phone', label: 'پروژه', type: 'text' },
          { key: 'nationalId', label: 'دستی ', type: 'text' },
        ]}
        onRowClick={(row) => console.log(row)}
        color={'#2F27CE'}
        className="mt-7 rounded-sm"
      />
    </MainLayout>
  )
}

export default Accounting
