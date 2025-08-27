
// import { RefObject, useRef, useState } from 'react'
// import useClickOutside from '@/hook/useClickOutside'
// import { IoCloseCircle } from 'react-icons/io5'
// import Input from '@/components/hub/Forms/Input'
// import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
// import SwitchBox from '@/components/hub/Forms/SwitchBox'
// import Image from 'next/image'

// interface CacheDataInterface {
//   code: string
//   name: string
//   currency: string
//   description: string
//   switchNumber: string
//   terminalNumber: string
//   merchantNumber: string
//   isDefault: boolean
// }

// const ImprestModal = ({
//   onClose,
//   onSubmit
// }: {
//   onClose: () => void
//   onSubmit: (data: CacheDataInterface) => void
// }) => {
//   const modalRef = useRef<HTMLDivElement | null>(null)
//   useClickOutside(modalRef as RefObject<HTMLElement>, () => {
//     onClose()
//   })

//   const [formData, setFormData] = useState<CacheDataInterface>({
//     code: '',
//     name: '',
//     currency: 'IRR',
//     description: '',
//     switchNumber: '',
//     terminalNumber: '',
//     merchantNumber: '',
//     isDefault: false
//   })

//   const handleChange = (
//     key: keyof typeof formData,
//     value: string | boolean
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value
//     }))
//   }

//   const handleSave = () => {
//     onSubmit(formData)
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div
//         ref={modalRef}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh] animate-slideInX"
//       >
//         <IoCloseCircle
//           className="text-[44px] cursor-pointer absolute top-4 left-4 text-red-400 hover:text-red-500 transition"
//           onClick={onClose}
//         />

//         {/* تصویر و عنوان */}
//         <div className="flex justify-center mb-4">
//           <Image
//             src="/images/cache.png"
//             alt="bank logo"
//             width={120}
//             height={120}
//             className="rounded-xl"
//           />
//         </div>
//         <h2 className="text-2xl md:text-3xl font-bold text-[#2F27CE] mb-8 text-center">
//           فرم ثبت اطلاعات صندوق
//         </h2>

//         {/* فرم */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <Input
//             label="کد حسابداری"
//             value={formData.code}
//             onChange={(val) => handleChange('code', val)}
//           />
//           <Input
//             label="نام  "
//             value={formData.name}
//             onChange={(val) => handleChange('name', val)}
//           />
//           <div className="flex flex-col gap-2">
//             <label className="text-gray-600">واحد پول</label>
//             <SingleSelectList
//               label="واحد پول"
//               items={[{ id: 'IRR', label: 'IRR - ریال ایران' }]}
//               setSelectedItems={(val) =>
//                 handleChange('currency', val as string)
//               }
//             />
//           </div>

//           <Input
//             label="توضیحات"
//             value={formData.description}
//             onChange={(val) => handleChange('description', val)}
//           />
//           <Input
//             label="شماره سوییچ پرداخت"
//             value={formData.switchNumber}
//             onChange={(val) => handleChange('switchNumber', val)}
//           />
//           <Input
//             label="شماره ترمینال پرداخت"
//             value={formData.terminalNumber}
//             onChange={(val) => handleChange('terminalNumber', val)}
//           />
//           <Input
//             label="شماره پذیرنده"
//             value={formData.merchantNumber}
//             onChange={(val) => handleChange('merchantNumber', val)}
//           />
//           <SwitchBox
//             label="پیش‌فرض"
//             leftText="بله"
//             rightText="خیر"
//             value={formData.isDefault}
//             onChange={(val) => handleChange('isDefault', val)}
//           />
//         </div>

//         {/* دکمه ذخیره */}
//         <button
//           onClick={handleSave}
//           className="mt-4 bg-[#2F27CE] hover:bg-[#3f3fe0] text-white font-semibold w-full py-2 rounded-md shadow-md transition-all duration-150"
//         >
//           ذخیره
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes slideInX {
//           from {
//             transform: translateX(100px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideInX {
//           animation: slideInX 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ImprestModal

import { RefObject, useEffect, useRef, useState } from 'react'
import useClickOutside from '@/hook/useClickOutside'
import { IoCloseCircle } from 'react-icons/io5'
import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import Image from 'next/image'
import { ImprestInterface } from '../CardItem/page'

interface ImprestModalProps {
  title: string
  data: ImprestInterface
  setData: React.Dispatch<React.SetStateAction<ImprestInterface | null>>
  onClose: () => void
  isEdit: boolean
}

const ImprestModal = ({
  title,
  data,
  setData,
  onClose,
  isEdit,
}: ImprestModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(modalRef as RefObject<HTMLElement>, onClose)

  const [formData, setFormData] = useState<ImprestInterface>(data)

  // وقتی داده ورودی عوض میشه (مثلاً برای ویرایش) فرم رو به‌روزرسانی کن
  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (key: keyof ImprestInterface, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    setData(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh] animate-slideInX"
      >
        {/* دکمه بستن */}
        <IoCloseCircle
          className="text-[44px] cursor-pointer absolute top-4 left-4 text-red-400 hover:text-red-500 transition"
          onClick={onClose}
        />

        {/* تصویر و عنوان */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/cache.png"
            alt="logo"
            width={120}
            height={120}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2F27CE] mb-8 text-center">
          {title}
        </h2>

        {/* فرم */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Input
            label="نام"
            value={formData.name}
            onChange={(val) => handleChange('name', val)}
          />
          <Input
            label="موجودی"
            value={formData.balance}
            onChange={(val) => handleChange('balance', val)}
          />
          <div className="flex flex-col gap-2">
            <label className="text-gray-600">واحد پول</label>
            <SingleSelectList
              label="واحد پول"
              items={[{ id: 'ریال', label: 'ریال' }, { id: 'تومان', label: 'تومان' }]}
              setSelectedItems={(val) => handleChange('currency', val as string)}
            />
          </div>
          <Input
            label="توضیحات"
            value={formData.description}
            onChange={(val) => handleChange('description', val)}
          />
        </div>

        {/* دکمه ذخیره */}
        <button
          onClick={handleSave}
          className="mt-4 bg-[#2F27CE] hover:bg-[#3f3fe0] text-white font-semibold w-full py-2 rounded-md shadow-md transition-all duration-150"
        >
          ذخیره
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInX {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInX {
          animation: slideInX 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ImprestModal



