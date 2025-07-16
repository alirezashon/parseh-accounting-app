'use client'

import ProfileGallery from '@/components/hub/ProfileGallery'
import Switch from '@/components/hub/Switch'
import TabsWithIcons from '@/components/hub/TabSwitchIcons'
import { getCookieByKey } from '@/utils/cookies'
import { useState, useEffect } from 'react'
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaInfoCircle,
} from 'react-icons/fa'
import Address from './Forms/Address'
import AddressForm from './Forms/Address'

const AddPersons = () => {
  const [formData, setFormData] = useState({
    accountcode: '',
    alias: '',
    name: '',
    category: '',
    title: '',
    firstName: '',
    lastname: '',
    company: '',
    active: true,
    type: {
      customer: false,
      supplier: false,
      shareholder: false,
      employee: false,
    },
    addressDetail: {
      country: '',
      province: '',
      city: '',
      postalCode: '',
      address: '',
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
        <AddressForm
          addressDetail={formData.addressDetail}
          setAddressDetail={(data) =>
            setFormData((prev) => ({
              ...prev,
              addressDetail: { ...prev.addressDetail, ...data },
            }))
          }
        />
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
  const generateAccountingCode = () => {
    return 'AC-' + Math.floor(100000 + Math.random() * 900000).toString()
  }

  useEffect(() => {
    const defaultCode = generateAccountingCode()
    setFormData((prev) => ({ ...prev, accountcode: defaultCode }))
  }, [])
  return (
    <div className='w-full p-4 bg-white  flex flex-col  items-center'>
      <div className='flex flex-col  max-lg:items-center lg:flex-row gap-6 w-full'>
        {/* گالری پروفایل */}
        <ProfileGallery uploadImage={UploadImage} />

        {/* فرم اطلاعات */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1'>
          {/* کد حسابداری + فعال/اتوماتیک */}
          <div className='col-span-2 flex flex-col gap-2'>
            <label className='font-medium'>کد حسابداری</label>
            <div className='flex flex-wrap items-center gap-4 justify-between'>
              <input
                type='text'
                value={formData.accountcode}
                onChange={(e) =>
                  setFormData({ ...formData, accountcode: e.target.value })
                }
                className='input border rounded px-3 py-2 w-[40%]'
              />
              <div className='flex justify-end gap-5 w-1/2 '>
                <label className='flex items-center gap-2'>غیر فعال</label>
                <Switch
                  isActive={formData.active}
                  setIsActive={(value: boolean) =>
                    setFormData({ ...formData, active: value })
                  }
                />
                <label className='flex items-center gap-2'>فعال</label>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-medium'>نام شرکت</label>
            <input
              placeholder='نام شرکت'
              className='input border rounded px-3 py-2'
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium'>
              نام مستعار <span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='نام مستعار'
              className='input border rounded px-3 py-2'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium'>نام </label>
            <input
              placeholder='نام '
              className='input border rounded px-3 py-2'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium'>
              نام مستعار <span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='نام خانوادگی'
              className='input border rounded px-3 py-2'
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>

          {/* عنوان */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium'>عنوان</label>
            <input
              placeholder='عنوان'
              className='input border rounded px-3 py-2'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* دسته‌بندی (Select) */}
          <div className=' flex flex-col gap-2'>
            <label className='font-medium'>دسته‌بندی</label>
            <select
              className='border border-gray-300 outline-none rounded-lg px-3 py-2'
              value={formData.category || ''}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value=''>انتخاب کنید</option>
              <option value='real'>حقیقی</option>
              <option value='legal'>حقوقی</option>
              <option value='foreign'>خارجی</option>
            </select>
          </div>
          {/* نوع شخص (چک‌باکس‌ها) */}
          <div className='col-span-2 flex flex-col gap-2'>
            <label className='font-medium'>نوع</label>
            <div className='flex flex-wrap gap-16 max-md:gap-7'>
              {['customer', 'supplier', 'shareholder', 'employee'].map(
                (key) => (
                  <label key={key} className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      className='accent-[#2F27CE] w-4 h-4 cursor-pointer'
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
      <div className='w-full overflow-auto mt-5'>
        <TabsWithIcons tabs={tabs} />
      </div>
    </div>
  )
}

export default AddPersons
