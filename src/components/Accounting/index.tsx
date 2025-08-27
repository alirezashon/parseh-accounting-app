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
          { key: 'VoucherID', label: 'شناسه رسید', type: 'text' },
          { key: 'LedgerRef', label: 'دفتر کل', type: 'text' },
          { key: 'FiscalYearRef', label: 'مرجع سال مالی', type: 'text' },
          { key: 'BranchRef', label: 'مرجع شعبه', type: 'text' },
          { key: 'Number', label: 'شماره', type: 'text' },
          { key: 'Sequence', label: 'توالی', type: 'text' },
          { key: 'DailyNumber', label: 'شماره روزانه', type: 'text' },
          { key: 'AuxiliaryNumber', label: 'شماره کمکی', type: 'text' },
          { key: 'Date', label: 'تاریخ', type: 'text' },
          { key: 'VoucherTypeRef', label: 'مرجع نوع رسید', type: 'text' },
          { key: 'Creator', label: 'ایجادکننده', type: 'text' },
          { key: 'CreationDate', label: 'تاریخ ایجاد', type: 'text' },
          { key: 'LastModifier', label: 'آخرین اصلاح‌کننده', type: 'text' },
          {
            key: 'LastModificationDate',
            label: 'آخرین اصلاح‌کننده',
            type: 'text',
          },
          { key: 'Description', label: 'توضیحات', type: 'text' },
          { key: 'Description_En', label: 'توضیحات_شماره', type: 'text' },
          { key: 'State', label: 'وضعیت', type: 'text' },
          { key: 'IsTemporary', label: 'موقتی', type: 'text' },
          { key: 'IsCurrencyBased', label: 'مبتنی بر ارز', type: 'text' },
          { key: 'IsExternal', label: 'خارجی', type: 'text' },
          { key: 'ReferenceNumber', label: 'شماره مرجع', type: 'text' },
          {
            key: 'ShowCurrencyFields',
            label: 'نمایش فیلدهای ارزی',
            type: 'text',
          },
          { key: 'IsReadonly', label: 'فقط خواندنی', type: 'text' },
          { key: 'Version', label: 'نسخه', type: 'text' },
          { key: 'cust_id', label: 'شناسه مشتری', type: 'text' },
          { key: 'sys_id', label: 'شناسه سیستم', type: 'text' },
          { key: 'sys_status', label: 'وضعیت سیستم', type: 'text' },
          { key: 'sys_st_date_pe_c', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_st_date_pe', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_st_date_en', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_type', label: 'sys_type', type: 'text' },
          { key: 'sys_app', label: 'sys_app', type: 'text' },
        ]}
        onRowClick={(row) => console.log(row)}
        color={'#2F27CE'}
        className="mt-7 rounded-sm"
      />
    </MainLayout>
  )
}

export default Accounting
