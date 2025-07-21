import Image from 'next/image'
import { useRouter } from 'next/navigation'

const OpeningBalance = ({ changeStep }: { changeStep?: () => void }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>تراز افتتاحیه</h1>
        <p>
          اگر در تاریخ شروع سال مالی، مبالغی در بانک‌ها و صندوق‌ها وجود داشته
          باشد یا از کالاها تعدادی موجود باشد، به این‌ها باید در تراز افتتاحیه
          اشاره شود.
        </p>
        <p className='text-blue-700'>
          بدهکاران و بستانکاران، موجودی کالا، بانک، صندوق، اثاثیه، حق امتیاز،
          ودایع و... همگی باید در تراز افتتاحیه ثبت شوند.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <button
            onClick={() => router.push('/accounting/financial-summary')}
            className='fill-button rounded-lg h-10 min-w-40'
          >
            ایجاد تراز جدید
          </button>
          <button
            onClick={changeStep}
            className='border-button rounded-lg h-10 min-w-40'
          >
            مرحله بعدی
          </button>
        </div>
      </div>
      <Image
        alt=''
        src={'/images/OpeningBalance.png'}
        width={333}
        height={300}
      />
    </div>
  )
}

export default OpeningBalance
