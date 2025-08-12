import Image from 'next/image'

const End = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>پایان 🎉</h1>
        <p>
          برای شروع همین‌قدر کافی است. اگر سؤالی دارید یا ابهامی برایتان پیش
          آمده، با پشتیبانی حسابفا تماس بگیرید.
        </p>
        <p className='text-blue-700'>
          کارشناسان حسابفا شما را تا رسیدن به مقصد همراهی خواهند کرد. هم‌اکنون
          می‌توانید اولین فاکتور فروش خود را ثبت کنید.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <button
            onClick={changeStep}
            className='fill-button rounded-lg h-10 px-6'
          >
            مرحله قبل
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
        src={'/images/end.png'}
        width={600}
        height={600}
        className='w-full max-w-md'
      />
    </div>
  )
}

export default End
