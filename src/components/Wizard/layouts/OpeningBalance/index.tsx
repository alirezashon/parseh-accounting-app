import Image from 'next/image'

const OpeningBalance = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col gap-7'>
          <h1 className='font-bold text-2xl'> تراز افتتاحیه</h1>
          <p>
            اگر در تاریخ شروع سال مالی در بانک ها و صندوق ها مبالغی وجود داشته
            باشد یا از یک کالا تعدادی در انبار موجود باشد، به این مبالغ و تعداد
          </p>
          <p className='text-blue-700'>
            . بدهکاران و بستانکاران کسب و کار شما، موجودی ابتدای دوره کالا ها،
            موجودی بانک ها و صندوق ها، اسباب و اثاثیه اداری، حق امتیازها، ودایع
            و هر آنچه که در ابتدای کار وجود دارد، باید در تراز افتتاحیه ثبت
            شوند.
          </p>
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
        <Image alt='' src={'/images/finance.png'} width={600} height={600} />
      </div>
    </div>
  )
}

export default OpeningBalance
