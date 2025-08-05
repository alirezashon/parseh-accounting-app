// 'use client'
// import { useState } from 'react'
// import FormHead from '../Headers/FormHead'
// import Input from '../hub/Forms/Input'

// type FormFields = {
//   bussinesName: string
//   legalName: string
//   Language: string
//   businessType: string
//   activityField: string
//   nationalId: string
//   economicCode: string
//   registrationNumber: string
//   country: string
//   province: string
//   city: string
//   postalCode: string
//   phone: string
//   fax: string
//   address: string
//   website: string
//   email: string
//   accountingSystem: string
//   inventoryEvaluationMethod: string
//   calendar: string
//   vatRate: string
//   fiscalStart: string
//   fiscalEnd: string
//   fiscalYearTitle: string
// }

// const labels: Record<keyof FormFields, string> = {
//   bussinesName: 'نام کسب‌وکار',
//   legalName: 'نام قانونی',
//   Language: 'زبان',
//   businessType: 'نوع کسب و کار',
//   activityField: 'زمینه فعالیت',
//   nationalId: 'شناسه ملی',
//   economicCode: 'کد اقتصادی',
//   registrationNumber: 'شماره ثبت',
//   country: 'کشور',
//   province: 'استان',
//   city: 'شهر',
//   postalCode: 'کدپستی',
//   phone: 'تلفن',
//   fax: 'فکس',
//   address: 'آدرس',
//   website: 'وب سایت',
//   email: 'ایمیل',
//   accountingSystem: 'سیستم حسابداری انبار',
//   inventoryEvaluationMethod: 'روش ارزیابی انبار',
//   calendar: 'تقویم',
//   vatRate: 'نرخ مالیات ارزش افزوده',
//   fiscalStart: 'تاریخ شروع',
//   fiscalEnd: 'تاریخ پایان',
//   fiscalYearTitle: 'عنوان سال مالی',
// }

// const Business = () => {
//   const [formData, setFormData] = useState<FormFields>({
//     bussinesName: '',
//     legalName: '',
//     Language: '',
//     businessType: '',
//     activityField: '',
//     nationalId: '',
//     economicCode: '',
//     registrationNumber: '',
//     country: '',
//     province: '',
//     city: '',
//     postalCode: '',
//     phone: '',
//     fax: '',
//     address: '',
//     website: '',
//     email: '',
//     accountingSystem: '',
//     inventoryEvaluationMethod: '',
//     calendar: '',
//     vatRate: '',
//     fiscalStart: '',
//     fiscalEnd: '',
//     fiscalYearTitle: '',
//   })

//   return (
//     <div>
//       <FormHead formName='تعریف کسب و کار' />
//       <div className='flex flex-wrap justify-between gap-4'>
//         {Object.entries(formData).map(([key, value]) => (
//           <div key={key} className='w-[32%] max-lg:w-[48%] max-sm:w-full'>
//             <Input
//               value={value}
//               label={labels[key as keyof FormFields]}
//               onChange={(result: string) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   [key]: result,
//                 }))
//               }
//               placeholder={labels[key as keyof FormFields]}
//               inputState='in'
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Business

'use client'
import { useState } from 'react'
import FormHead from '../Headers/FormHead'
import Input from '../hub/Forms/Input'
import Divider from '../hub/Forms/Divider'
import SingleSelectList from '../hub/Forms/SingleSelectList'

const sections = [
  {
    title: 'اطلاعات کلی',
    fields: [
      { name: 'bussinesName', label: 'نام کسب‌وکار', type: 'text' },
      { name: 'legalName', label: 'نام قانونی', type: 'text' },
      { name: 'Language', label: 'زبان', type: 'text' },
      {
        name: 'businessType',
        label: 'نوع کسب و کار',
        type: 'select',
        items: ['شرکت', 'موسسه', 'سایر'],
      },
      { name: 'activityField', label: 'زمینه فعالیت', type: 'text' },
    ],
  },
  {
    title: 'اطلاعات ثبتی',
    fields: [
      { name: 'nationalId', label: 'شناسه ملی', type: 'text' },
      { name: 'economicCode', label: 'کد اقتصادی', type: 'text' },
      { name: 'registrationNumber', label: 'شماره ثبت', type: 'text' },
    ],
  },
  {
    title: 'مکان و تماس',
    fields: [
      { name: 'country', label: 'کشور', type: 'text' },
      { name: 'province', label: 'استان', type: 'text' },
      { name: 'city', label: 'شهر', type: 'text' },
      { name: 'postalCode', label: 'کدپستی', type: 'text' },
      { name: 'phone', label: 'تلفن', type: 'text' },
      { name: 'fax', label: 'فکس', type: 'text' },
      { name: 'address', label: 'آدرس', type: 'text' },
      { name: 'website', label: 'وب سایت', type: 'text' },
      { name: 'email', label: 'ایمیل', type: 'text' },
    ],
  },
  {
    title: 'سیستم و تنظیمات',
    fields: [
      {
        name: 'accountingSystem',
        label: 'سیستم حسابداری انبار',
        type: 'select',
        items: ['دائمی', 'آنی', 'تناوبی'],
      },
      {
        name: 'inventoryEvaluationMethod',
        label: 'روش ارزیابی انبار',
        type: 'select',
        items: ['FIFO', 'LIFO', 'میانگین موزون'],
      },
      {
        name: 'multiCurrency',
        label: 'امکان استفاده از سیستم چند ارزی',
        type: 'switch',
        rightText: 'ندارد',
        leftText: 'دارد',
      },
      {
        name: 'inventorySystem',
        label: 'امکان استفاده از سیستم انبارداری',
        type: 'switch',
        rightText: 'خاموش',
        leftText: 'روشن',
      },
    ],
  },
  {
    title: 'سال مالی',
    fields: [
      { name: 'calendar', label: 'تقویم', type: 'text' },
      { name: 'vatRate', label: 'نرخ مالیات ارزش افزوده', type: 'text' },
      { name: 'fiscalStart', label: 'تاریخ شروع', type: 'text' },
      { name: 'fiscalEnd', label: 'تاریخ پایان', type: 'text' },
      { name: 'fiscalYearTitle', label: 'عنوان سال مالی', type: 'text' },
    ],
  },
]

const Business = () => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  return (
    <div>
      <FormHead formName='تعریف کسب و کار' />
      {sections.map((section, secIndex) => (
        <div key={secIndex} className='mb-10'>
          <Divider title={section.title} />
          <div className='flex flex-wrap justify-between gap-4 mt-4'>
            {section.fields.map((field, i) => (
              <div key={i} className='w-[32%] max-lg:w-[48%] max-sm:w-full'>
                {field.type === 'text' && (
                  <Input
                    label={field.label}
                    placeholder={field.label + ' . . . '}
                    value={formData[field.name] || ''}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, [field.name]: val }))
                    }
                  />
                )}
                {field.type === 'select' && (
                  <SingleSelectList
                    label={field.label}
                    items={
                      field.items?.map((item) => ({
                        id: item,
                        label: item,
                      })) || []
                    }
                    setSelectedItems={(val) =>
                      setFormData((prev) => ({ ...prev, [field.name]: val }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Business
