'use client'
import ProfileGallery from '@/components/hub/ProfileGallery'
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
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import SwitchBox from '@/components/hub/Forms/SwitchBox'
import Generals from './Forms/Generals'
import Contacts from './Forms/Contacts'
import BankAccounts from './Forms/Banks'
import Others from './Forms/Others'
import FormHead from '@/components/Headers/FormHead'

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
    generals: {
      credit: '',
      priceList: '',
      taxType: '',
      taxStatus: '',
      nationalId: '',
      economicCode: '',
      registrationNumber: '',
      branchCode: '',
      description: '',
    },
    contacts: {
      phone: '',
      mobile: '',
      fax: '',
    },
    bankAccounts: [
      {
        bankName: '',
        accountNumber: '',
        cardNumber: '',
        iban: '',
      },
    ],
    others: {
      birthDate: '',
      marriageDate: '',
      membershipDate: '',
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
        <Generals
          generals={formData.generals}
          setGenerals={(data) =>
            setFormData((prev) => ({
              ...prev,
              generals: { ...prev.generals, ...data },
            }))
          }
        />
      ),
    },
    {
      id: 'address',
      label: 'اطلاعات آدرس',
      icon: <FaMapMarkerAlt />,
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
      id: 'contact',
      label: 'تماس',
      icon: <FaPhone />,
      content: (
        <Contacts
          contacts={formData.contacts}
          setContacts={(data) =>
            setFormData((prev) => ({
              ...prev,
              addressDetail: { ...prev.addressDetail, ...data },
            }))
          }
        />
      ),
    },
    {
      id: 'bank',
      label: 'حساب بانکی',
      icon: <FaCreditCard />,
      content: (
        <BankAccounts
          bankAccounts={formData.bankAccounts}
          setBankAccounts={(data) =>
            setFormData((prev) => ({
              ...prev,
              bankAccounts: data,
            }))
          }
        />
      ),
    },
    {
      id: 'others',
      label: 'سایر',
      icon: <FaInfoCircle />,
      content: (
        <Others
          others={formData.others}
          setOthers={(data) =>
            setFormData((prev) => ({
              ...prev,
              others: { ...prev.others, ...data },
            }))
          }
        />
      ),
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
    <>
      <FormHead />
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
              inputState='error'
              message='کدی که زدی به درد عمت میخوره'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.company}
              label='نام شرکت'
              onChange={(result: string) =>
                setFormData({ ...formData, company: result })
              }
              inputState='ok'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.alias}
              label=' نام مستعار '
              onChange={(result: string) =>
                setFormData({ ...formData, alias: result })
              }
              inputState='in'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.name}
              label=' نام   '
              onChange={(result: string) =>
                setFormData({ ...formData, name: result })
              }
              inputState='need'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.lastname}
              label='نام خانوادگی'
              onChange={(result: string) =>
                setFormData({ ...formData, lastname: result })
              }
              inputState='unique'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              value={formData.title}
              label='عنوان'
              onChange={(result: string) =>
                setFormData({ ...formData, title: result })
              }
              inputState=' '
            />
          </div>
          <div className=' flex flex-col gap-2'>
            <label className='font-medium'>دسته‌بندی</label>
            <SingleSelectList
              label='انتخاب کنید'
              items={[
                { id: 'real', label: 'حقیقی' },
                { id: 'legal', label: 'حقوقی' },
                { id: 'foreign', label: 'خارجی' },
              ]}
              setSelectedItems={(selected) =>
                setFormData({ ...formData, category: selected as string })
              }
            />
          </div>
          <SwitchBox
            leftText='فعال'
            onChange={(value: boolean) =>
              setFormData({ ...formData, active: value })
            }
            rightText='غیر فعال'
            value
            inputState='error'
            label='وضعیت'
          />
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
    </>
  )
}

export default AddPersons
