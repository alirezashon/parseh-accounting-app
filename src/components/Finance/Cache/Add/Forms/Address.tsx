'use client'

import Input from '@/components/hub/Forms/Input'

type Props = {
  addressDetail: {
    country: string
    province: string
    city: string
    postalCode: string
    address: string
  }
  setAddressDetail: (data: Partial<Props['addressDetail']>) => void
}

const addressLabels: Record<keyof Props['addressDetail'], string> = {
  country: 'کشور',
  province: 'استان',
  city: 'شهر',
  postalCode: 'کد پستی',
  address: 'آدرس کامل',
}

const placeholders: Partial<Record<keyof Props['addressDetail'], string>> = {
  country: 'مثلاً ایران',
  province: 'مثلاً تهران',
  city: 'مثلاً تهران',
  postalCode: 'مثلاً 1234567890',
  address: 'خیابان، کوچه، پلاک، طبقه، واحد...',
}

const AddressForm = ({ addressDetail, setAddressDetail }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {(Object.keys(addressDetail) as (keyof Props['addressDetail'])[]).map(
        (key) => (
          <div key={key} className={key === 'address' ? 'sm:col-span-2' : ''}>
            <Input
              label={addressLabels[key]}
              value={addressDetail[key]}
              onChange={(value) => setAddressDetail({ [key]: value })}
              // placeholder={placeholders[key]}
              // type={key === 'address' ? 'textarea' : 'text'}
            />
          </div>
        )
      )}
    </div>
  )
}

export default AddressForm
