import Image from 'next/image'

const End = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col gap-7'>
          <h1 className='font-bold text-2xl'>پایان </h1>
          <p>
            برای شروع همین قدر کافی است👏 اگر سئوالی دارید یا ابهامی در کار با
            حسابفا برای شما پیش آمده، با پشتیبانی حسابفا تماس بگیرید. کارشناسان
            پشتیبانی
          </p>
          <p className='text-blue-700'>
            حسابفا، شما را تا رسیدن به مقصد همراهی خواهند کرد. هم اکنون می
            توانید اولین فاکتور فروش خود را ثبت کنید.
          </p>
          <div className='flex gap-5 mt-6 text-right'>
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
        <Image alt='' src={'/images/resources.png'} width={600} height={600} />
      </div>
    </div>
  )
}

export default End
