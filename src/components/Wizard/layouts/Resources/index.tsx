import Image from 'next/image'

const Resources = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>کالا / خدمت</h1>
        <p>
          ثبت کالاها و خدمات: هر چیزی که می‌خرید یا می‌فروشید را باید به‌صورت
          کالا یا خدمت ثبت کنید. اگر در فاکتور، مواردی نظیر نصب، راه‌اندازی،
          تعمیرات، آموزش و... دارید،
        </p>
        <p className='text-blue-700'>
          باید این موارد را به‌صورت خدمت در سیستم تعریف کنید. شما می‌توانید
          کالاها و خدمات را به‌صورت تکی یا با فایل اکسل به‌صورت یک‌باره ثبت
          کنید.
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
        src={'/images/resources.png'}
        width={400}
        height={300}
      />
    </div>
  )
}

export default Resources
