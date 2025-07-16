import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Shareholders = ({ changeStep }: { changeStep?: () => void }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>ثبت سهامداران</h1>
        <p>
          سهامداران کسب‌وکار شما اشخاصی هستند که در کسب‌وکار شما سرمایه‌گذاری
          کرده‌اند. این افراد در واقع شرکای کاری شما هستند.
        </p>
        <p className='text-blue-700'>
          ممکن است شما شریک نداشته باشید و خودتان مالک کسب‌وکار باشید. در این
          صورت تنها سهامدار خودتان هستید و درصد سهام شما ۱۰۰٪ است.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <button
            onClick={() => router.push('/persons/add')}
            className='fill-button rounded-lg h-10 min-w-40'
          >
            ثبت شخص
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
        src={'/images/shareHolders.png'}
        width={400}
        height={300}
        className='w-full max-w-sm'
      />
    </div>
  )
}

export default Shareholders
