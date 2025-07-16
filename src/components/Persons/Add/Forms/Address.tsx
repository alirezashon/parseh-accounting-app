'use client'

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


const AddressForm = ({ addressDetail, setAddressDetail }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className='flex flex-col gap-1'>
        <label className='font-medium'>کشور</label>
        <input
          type='text'
          placeholder='ایران'
          className='input border rounded px-3 py-2'
          value={addressDetail.country}
          onChange={(e) => setAddressDetail({ country: e.target.value })}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='font-medium'>استان</label>
        <input
          type='text'
          placeholder='تهران'
          className='input border rounded px-3 py-2'
          value={addressDetail.province}
          onChange={(e) => setAddressDetail({ province: e.target.value })}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='font-medium'>شهر</label>
        <input
          type='text'
          placeholder='تهران'
          className='input border rounded px-3 py-2'
          value={addressDetail.city}
          onChange={(e) => setAddressDetail({ city: e.target.value })}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='font-medium'>کدپستی</label>
        <input
          type='text'
          placeholder='1234567890'
          className='input border rounded px-3 py-2'
          value={addressDetail.postalCode}
          onChange={(e) => setAddressDetail({ postalCode: e.target.value })}
        />
      </div>

      <div className='col-span-2 flex flex-col gap-1'>
        <label className='font-medium'>آدرس</label>
        <textarea
          placeholder='آدرس کامل پستی...'
          className='input border rounded px-3 py-2'
          value={addressDetail.address}
          onChange={(e) => setAddressDetail({ address: e.target.value })}
        />
      </div>
    </div>
  )
}

export default AddressForm
