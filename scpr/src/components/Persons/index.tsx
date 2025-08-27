'use client'
import { useState } from 'react'
import EditableTable from '../Accounting/hub/DetailedBlankTable'
import { DiDatabase } from 'react-icons/di'
import { RiUserAddFill } from 'react-icons/ri'
import { ImMenu3 } from 'react-icons/im'
import MainHead from '../Headers/MainHead'

const Persons = () => {
  const [activeTab, setActiveTab] = useState('همه')
  const [isMobile, setIsMobile] = useState(false)
  return (
    <div>
      <MainHead
        title="اشخاص"
        icons={[
          {
            icon: <DiDatabase className="text-2xl" />,
            label: 'لیست اشخاص',
            destination: '/persons',
          },
          {
            icon: <RiUserAddFill className="text-2xl" />,
            label: 'ایجاد شخص',
            destination: '/persons/add',
          },
          {
            label: 'دریافت از شخص',
            icon: <RiUserAddFill className="text-2xl" />,
            destination: '/persons/received',
          },
          {
            icon: <ImMenu3 className="text-2xl" />,
            act: () => '',
            label: 'دریاقت از شخص',
            subList: [
              {
                icon: <ImMenu3 className="text-2xl" />,
                act: () => '',
                label: 'سایر',
              },
              {
                icon: <DiDatabase className="text-2xl" />,
                act: () => '',
                label: ' داده ها',
              },
              {
                icon: <RiUserAddFill className="text-2xl" />,
                act: () => '',
                label: 'ایجاد',
              },
            ],
          },
        ]}
      />
      <div className="relative w-full border-b border-gray-300 ">
        <div
          className={`flex ${isMobile ? 'relative h-12 overflow-hidden' : ''}`}
        >
          {['همه', 'مشتریان', 'تامیین کنندگان', 'کارمندان', 'بدون تراکنش'].map(
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
                  marginRight: isMobile && i !== 0 ? -25 : 0,
                  position: isMobile ? 'relative' : 'static',
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
          { key: 'currency', label: 'شرکت', type: 'text' },
          { key: 'currencyAmount', label: 'کشور', type: 'text' },
          { key: 'amountIRR', label: 'استان', type: 'text' },
          { key: 'city', label: 'شهر', type: 'text' },
          { key: 'mobile', label: 'موبایل', type: 'text' },
          { key: 'phone', label: 'تلفن', type: 'text' },
          { key: 'nationalId', label: 'شناسه ملی', type: 'text' },
          { key: 'economicCode', label: 'کد اقتصادی', type: 'text' },
          { key: 'registrationNumber', label: 'شماره ثبت', type: 'text' },
          { key: 'email', label: 'ایمیل', type: 'text' },
          { key: 'isActive', label: 'فعال', type: 'text' },
          { key: 'birthDate', label: 'تاریخ تولد', type: 'text' },
          { key: 'joinDate', label: 'تاریخ عضویت', type: 'text' },
        ]}
        onRowClick={(row) => console.log(row)}
        color={'#2F27CE'}
        className="mt-7 rounded-sm"
      />
    </div>
  )
}

export default Persons
