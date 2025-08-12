'use client'

import Input from '@/components/hub/Forms/Input'

type Props = {
  generals: {
    credit: string
    priceList: string
    taxType: string
    taxStatus: string
    nationalId: string
    economicCode: string
    registrationNumber: string
    branchCode: string
    description: string
  }
  setGenerals: (data: Partial<Props['generals']>) => void
}

const generalLabels: Record<keyof Props['generals'], string> = {
  credit: 'اعتبار مالی (ریال)',
  priceList: 'لیست قیمت',
  taxType: 'نوع مالیات',
  taxStatus: 'وضعیت مشمول مالیاتی',
  nationalId: 'شناسه ملی',
  economicCode: 'کد اقتصادی',
  registrationNumber: 'شماره ثبت',
  branchCode: 'کد شعبه',
  description: 'توضیحات',
}

const Generals = ({ generals, setGenerals }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {Object.keys(generals).map((key) => (
        <Input
          key={key}
          onChange={(value) => setGenerals({ ...generals, [key]: value })}
          value={generals[key as keyof typeof generals]}
          label={generalLabels[key as keyof typeof generals]}
        />
      ))}
    </div>
  )
}

export default Generals
