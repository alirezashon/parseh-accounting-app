import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Persons = ({ changeStep }: { changeStep?: () => void }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>ثبت اشخاص</h1>
        <p>
          اولین قدم برای کار با سیستم حسابداری، ثبت اشخاص طرف حساب شماست. این
          اشخاص می‌توانند مشتریان، تامین‌کنندگان، سهامداران، کارکنان و یا
          بازاریابان کسب‌وکار شما باشند.
        </p>
        <p className='text-blue-700'>
          شما می‌توانید اشخاص را به‌صورت تکی یا با فایل اکسل به‌صورت یک‌باره ثبت
          کنید.
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
        src={'/images/persons.png'}
        width={400}
        height={300}
        className='w-full max-w-sm'
      />
    </div>
  )
}

export default Persons
