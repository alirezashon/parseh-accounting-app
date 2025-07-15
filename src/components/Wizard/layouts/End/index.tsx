import Image from "next/image"

const End = () => {
  return (
    <div>
      برای شروع همین قدر کافی است👏 اگر سئوالی دارید یا ابهامی در کار با حسابفا
      برای شما پیش آمده، با پشتیبانی حسابفا تماس بگیرید. کارشناسان پشتیبانی
      حسابفا، شما را تا رسیدن به مقصد همراهی خواهند کرد. هم اکنون می توانید
      اولین فاکتور فروش خود را ثبت کنید.
      <div className='flex'>
        <div className='flex flex-col gap-7'>
          <h1 className='font-bold text-2xl'> </h1>
          <p></p>
          <p className='text-blue-700'></p>
          <div className='flex gap-5 mt-6 text-right'>
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
        <Image alt='' src={'/images/image.png'} width={600} height={600} />
      </div>   </div>
  )
}

export default End
