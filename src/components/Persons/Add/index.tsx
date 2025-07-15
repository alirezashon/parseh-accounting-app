'use client'

import ProfileGallery from '@/components/hub/ProfileGallery'
import TabsWithIcons from '@/components/hub/TabSwitchIcons'
import { getCookieByKey } from '@/utils/cookies'
import { useEffect, useState } from 'react'
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaInfoCircle,
} from 'react-icons/fa'

const AddPersons = () => {
  const [formData, setFormData] = useState({
    accountcode: '',
    alias: '',
    name: '',
    lastname: '',
    active: true,
    autoCode: true,
    type: {
      customer: false,
      supplier: false,
      shareholder: false,
      employee: false,
    },
  })

  const UploadImage = async (formData: FormData): Promise<boolean> => {
    try {
      const accessToken = (await getCookieByKey('access_token')) || ''
      const result = ''
      if (result) return true
      else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const tabs = [
    {
      id: 'general',
      label: 'عمومی',
      icon: <FaUser />,
      content: (
        <div className='grid grid-cols-2 gap-4'>
          <input
            className='input border rounded px-2 py-1'
            placeholder='کد اقتصادی'
          />
          <input
            className='input border rounded px-2 py-1'
            placeholder='شماره ثبت'
          />
          <input
            className='input border rounded px-2 py-1'
            placeholder='شناسه ملی'
          />
          <input
            className='input border rounded px-2 py-1'
            placeholder='کد شعبه'
          />
          <textarea
            className='input border rounded px-2 py-1 col-span-2'
            placeholder='توضیحات'
          />
        </div>
      ),
    },
    {
      id: 'address',
      label: 'اطلاعات آدرس',
      icon: <FaMapMarkerAlt />,
      content: <div>📍 فرم آدرس اینجاست</div>,
    },
    {
      id: 'contact',
      label: 'تماس',
      icon: <FaPhone />,
      content: <div>📞 فرم اطلاعات تماس اینجاست</div>,
    },
    {
      id: 'bank',
      label: 'حساب بانکی',
      icon: <FaCreditCard />,
      content: <div>🏦 فرم حساب بانکی اینجاست</div>,
    },
    {
      id: 'others',
      label: 'سایر',
      icon: <FaInfoCircle />,
      content: <div>🔧 اطلاعات دیگر</div>,
    },
  ]
  const signUp = async () => {
    await fetch('http://185.213.165.166:7569/api/sys/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        mobile: '09369486468',
        referral_code: 'string',
        password: 'Aa12345@',
        user_type: 0,
      }),
    })
  }
  useEffect(() => {
    signUp()
  }, [])
  return (
    <div className='p-4 bg-white m-10 flex flex-col  items-center'>
      <div className='flex gap-6 items-start max-lg:flex-col w-full'>
        <ProfileGallery uploadImage={UploadImage} />
        <div className='grid grid-cols-2 gap-4 flex-1'>
          <div className='col-span-2 flex items-center gap-4'>
            <label className=''>کد حسابداری</label>
            <input
              type='text'
              value={formData.accountcode}
              onChange={(e) =>
                setFormData({ ...formData, accountcode: e.target.value })
              }
              className='input border rounded px-2 py-1 w-96'
            />
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
                className='accent-[#2F27CE] w-5 h-5'
              />
              فعال
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={formData.autoCode}
                onChange={(e) =>
                  setFormData({ ...formData, autoCode: e.target.checked })
                }
                className='accent-[#2F27CE] w-5 h-5'
              />
              اتوماتیک
            </label>
          </div>
          <div className='col-span-2 flex items-center gap-4'>
            <label className=''>شرکت</label>
            <input
              placeholder='شرکت'
              className='input border rounded px-2 py-1 w-96'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <input
            placeholder='نام خانوادگی'
            className='input border rounded px-2 py-1'
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
          <input
            placeholder='عنوان'
            className='input border rounded px-2 py-1 col-span-2'
          />

          {/* نام مستعار */}
          <div className='col-span-2 flex flex-col'>
            <label>
              نام مستعار <span className='text-red-500'>*</span>
            </label>
            <input
              className='input border rounded px-2 py-1'
              value={formData.alias}
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
            />
          </div>

          {/* نوع شخص - چک‌باکس‌ها */}
          <div className='col-span-2'>
            <label className='block mb-1'>نوع</label>
            <div className='flex flex-wrap gap-4'>
              {['customer', 'supplier', 'shareholder', 'employee'].map(
                (key) => (
                  <label key={key} className='flex items-center gap-1'>
                    <input
                      type='checkbox'
                      className='accent-[#2F27CE] w-4'
                      checked={formData.type[key as keyof typeof formData.type]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: {
                            ...formData.type,
                            [key]: e.target.checked,
                          },
                        })
                      }
                    />
                    {
                      {
                        customer: 'مشتری',
                        supplier: 'تأمین‌کننده',
                        shareholder: 'سهام‌دار',
                        employee: 'کارمند',
                      }[key]
                    }
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <TabsWithIcons tabs={tabs} className='mt-4' />
      </div>
    </div>
  )
}

export default AddPersons
