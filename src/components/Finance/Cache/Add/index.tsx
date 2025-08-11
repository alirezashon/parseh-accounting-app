'use client'
import { useState } from 'react'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import SwitchBox from '@/components/hub/Forms/SwitchBox'
import Image from 'next/image'
import MainHead from '@/components/Headers/MainHead'
import { GiCardPick, GiCardRandom } from 'react-icons/gi'
import { PiCoinsFill } from 'react-icons/pi'
import { BsDatabaseFillAdd } from 'react-icons/bs'

const AddCache = () => {
  const [CacheData, setCacheData] = useState({
    code: '',
    name: '',
    accountNumber: '',
    cardNumber: '',
    iban: '',
    ownerName: '',
    posNumber: '',
    currency: 'IRR',
    isDefault: false,
    description: '',
    mobile: '',
    switchNumber: '',
    terminalNumber: '',
    merchantNumber: '',
  })

  const handleChange = (
    key: keyof typeof CacheData,
    value: string | boolean
  ) => {
    setCacheData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = () => {}

  return (
    <>
      <MainHead
        title="افزودن صندوق"
        icons={[
          {
            icon: <BsDatabaseFillAdd size={30} />,
            label: ' ایجاد صندوق',
            destination: '/finance/cache/add',
          },
          {
            icon: <GiCardPick size={30} />,
            label: 'لیست مالی',
            destination: '/finance',
          },
          {
            icon: <PiCoinsFill size={35} />,
            label: 'صندوق ها',
            destination: '/accounting/cache',
          },
          {
            icon: <GiCardRandom size={30} />,
            label: ' بانک ها',
            destination: '/finance/banks',
          },
        ]}
      />
      <div className="w-full max-w-7xl mx-auto rounded-b-2xl px-6 py-5 ">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/cache.png"
            alt="bank logo"
            width={120}
            height={120}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2F27CE] mb-8 text-center">
          فرم ثبت اطلاعات صندوق
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Input
            label="کد حسابداری"
            value={CacheData.code}
            onChange={(val) => handleChange('code', val)}
          />
          <Input
            label="نام  "
            value={CacheData.name}
            onChange={(val) => handleChange('name', val)}
          />
          <div className="flex flex-col gap-2">
            <label className="text-gray-600">واحد پول</label>
            <SingleSelectList
              label="واحد پول"
              items={[{ id: 'IRR', label: 'IRR - ریال ایران' }]}
              setSelectedItems={(val) =>
                handleChange('currency', val as string)
              }
            />
          </div>

          <Input
            label="توضیحات"
            value={CacheData.description}
            onChange={(val) => handleChange('description', val)}
          />
          <Input
            label="شماره سوییچ پرداخت"
            value={CacheData.switchNumber}
            onChange={(val) => handleChange('switchNumber', val)}
          />
          <Input
            label="شماره ترمینال پرداخت"
            value={CacheData.terminalNumber}
            onChange={(val) => handleChange('terminalNumber', val)}
          />
          <Input
            label="شماره پذیرنده"
            value={CacheData.merchantNumber}
            onChange={(val) => handleChange('merchantNumber', val)}
          />
          <SwitchBox
            label="پیش‌فرض"
            leftText="بله"
            rightText="خیر"
            value={CacheData.isDefault}
            onChange={(val) => handleChange('isDefault', val)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-10 bg-[#2F27CE] hover:bg-[#3f3fe0] text-white font-semibold w-full py-2 rounded-md shadow-md transition-all duration-150"
        >
          ثبت اطلاعات حساب
        </button>
      </div>
    </>
  )
}

export default AddCache
