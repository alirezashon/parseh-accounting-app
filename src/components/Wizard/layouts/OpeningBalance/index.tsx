import Image from 'next/image'

const OpeningBalance = ({ changeStep }: { changeStep?: () => void }) => {
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
            onClick={changeStep}
            className='fill-button rounded-lg h-10 px-6'
          >
            مرحله بعد
          </button>
          <button
            onClick={() => alert('اخرج')}
            className='border-button rounded-lg h-10 px-6'
          >
            خروج
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
