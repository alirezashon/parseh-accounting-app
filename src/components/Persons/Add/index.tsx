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
import AddressForm from './Forms/Address'
import Input from '@/components/hub/Forms/Input'

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
    <div className='w-full p-4 border-x border-[#2f27ce65] bg-[white] shadow-[#2f27ce65] shadow-2xl flex flex-col  items-center'>
      <div className='flex flex-col  max-lg:items-center lg:flex-row gap-6 w-full'>
        <ProfileGallery uploadImage={UploadImage} />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 '>
          <div className='  flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label='کد حسابداری'
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates='error'
              message='کدی که زدی به درد عمت میخوره'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label='نام شرکت'
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates='ok'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label=' نام مستعار '
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates='in'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label=' نام   '
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates='need'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label='نام خانوادگی'
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates='unique'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.accountcode}
              label='عنوان'
              onChange={(result: string) =>
                setFormData({ ...formData, accountcode: result })
              }
              inputStates=' '
            />
          </div>
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
          <div className=' flex flex-col gap-2'>
            <label>وضعیت</label>
            <div className='flex border-b h-full border-[#2f27cebb] gap-5 items-center'>
              <label className='flex items-center  '>غیر فعال</label>
              <Switch
                isActive={formData.active}
                setIsActive={(value: boolean) =>
                  setFormData({ ...formData, active: value })
                }
              />
              <label className='flex items-center gap-2'>فعال</label>
            </div>
          </div>
          <div className='col-span-2 flex flex-col  '>
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
