const Resources = () => {
  return (
    <div>
      ثبت کالاها و خدمات هر چیزی که می خرید یا می فروشید را باید به صورت کالا یا
      خدمت در سیستم ثبت کنید. در صورتی که در فاکتور مواردی نظیر نصب و راه
      اندازی، تعمیرات، آموزش یا مانند اینها را ثبت می کنید، باید این موارد را به
      صورت خدمت در سیستم تعریف کنید. شما می توانید کالاها و خدمات را به صورت تک
      تک یا در قالب فایل اکسل و به صورت یکباره در سیستم ثبت کنید.

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
      </div>
    </div>
  )
}

export default Resources
