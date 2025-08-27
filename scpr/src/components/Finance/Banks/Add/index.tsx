'use client'

import { useState } from 'react'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import SwitchBox from '@/components/hub/Forms/SwitchBox'
import Image from 'next/image'
import FormHead from '@/components/Headers/FormHead'

const AddBank = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1)

  const [bankData, setBankData] = useState({
    code: '',
    branchName: '',
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
    key: keyof typeof bankData,
    value: string | boolean
  ) => {
    setBankData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = () => {
    console.log('✅ اطلاعات ارسال شد:', bankData)
    // ارسال API
  }

  return (
    <>
      <FormHead formName='ایجاد حساب بانکی' />
      <div className='w-full max-w-7xl mx-auto bg-white border border-[#2F27CE] rounded-b-2xl px-6 py-10'>
        <div className='flex justify-center mb-4'>
          <Image
            src='/images/banks.png'
            alt='bank logo'
            width={120}
            height={120}
            className='rounded-xl'
          />
        </div>

        <h2 className='text-2xl md:text-3xl font-bold text-[#2F27CE] mb-8 text-center'>
          فرم ثبت اطلاعات حساب بانکی
        </h2>

        <div className='flex justify-center mb-8 border-b border-[#d0d4f7]'>
          <button
            onClick={() => setActiveTab(1)}
            className={`px-4 py-3 text-sm md:text-base font-semibold transition-all duration-200 relative
      ${
        activeTab === 1
          ? 'text-[#2F27CE] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#2F27CE]'
          : 'text-gray-500 hover:text-[#2F27CE]'
      }`}
          >
            مرحله اول
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-4 py-3 text-sm md:text-base font-semibold transition-all duration-200 relative
      ${
        activeTab === 2
          ? 'text-[#2F27CE] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#2F27CE]'
          : 'text-gray-500 hover:text-[#2F27CE]'
      }`}
          >
            مرحله دوم
          </button>
        </div>

        {activeTab === 1 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
            <Input
              label='کد حسابداری'
              value={bankData.code}
              onChange={(val) => handleChange('code', val)}
            />
            <Input
              label='نام شعبه'
              value={bankData.branchName}
              onChange={(val) => handleChange('branchName', val)}
            />
            <Input
              label='شماره حساب'
              value={bankData.accountNumber}
              onChange={(val) => handleChange('accountNumber', val)}
            />
            <Input
              label='شماره کارت'
              value={bankData.cardNumber}
              onChange={(val) => handleChange('cardNumber', val)}
            />
            <Input
              label='شبا'
              value={bankData.iban}
              onChange={(val) => handleChange('iban', val)}
            />
            <Input
              label='نام صاحب حساب'
              value={bankData.ownerName}
              onChange={(val) => handleChange('ownerName', val)}
            />

            <div className='col-span-full flex justify-center mt-4'>
              <button
                onClick={() => setActiveTab(2)}
                className='bg-[#2F27CE] hover:bg-[#3d39e0] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-150'
              >
                بعدی
              </button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
            <Input
              label='شماره POS'
              value={bankData.posNumber}
              onChange={(val) => handleChange('posNumber', val)}
            />
            <div className='flex flex-col gap-2'>
              <label className='text-gray-600'>واحد پول</label>
              <SingleSelectList
                label='واحد پول'
                items={[{ id: 'IRR', label: 'IRR - ریال ایران' }]}
                setSelectedItems={(val) =>
                  handleChange('currency', val as string)
                }
              />
            </div>
            <SwitchBox
              label='پیش‌فرض'
              leftText='بله'
              rightText='خیر'
              value={bankData.isDefault}
              onChange={(val) => handleChange('isDefault', val)}
            />
            <Input
              label='توضیحات'
              value={bankData.description}
              onChange={(val) => handleChange('description', val)}
            />
            <Input
              label='شماره موبایل اینترنت بانک'
              value={bankData.mobile}
              onChange={(val) => handleChange('mobile', val)}
            />
            <Input
              label='شماره سوییچ پرداخت'
              value={bankData.switchNumber}
              onChange={(val) => handleChange('switchNumber', val)}
            />
            <Input
              label='شماره ترمینال'
              value={bankData.terminalNumber}
              onChange={(val) => handleChange('terminalNumber', val)}
            />
            <Input
              label='شماره پذیرنده'
              value={bankData.merchantNumber}
              onChange={(val) => handleChange('merchantNumber', val)}
            />

            <div className='col-span-full flex justify-center mt-4'>
              <button
                onClick={handleSubmit}
                className='bg-[#2F27CE] hover:bg-[#3f3fe0] text-white font-semibold px-8 py-2 rounded-xl shadow-md transition-all duration-150'
              >
                ثبت اطلاعات حساب
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AddBank
