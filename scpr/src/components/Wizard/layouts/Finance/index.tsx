import Image from 'next/image'

const Finance = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>بانکداری</h1>
        <p>
          ثبت بانک‌ها و صندوق‌ها: زمانی که مشتری مبلغی را با کارت بانکی پرداخت
          می‌کند، وجه به حساب بانکی شما واریز می‌گردد، ولی اگر پول نقد پرداخت
          کند...
        </p>
        <p className='text-blue-700'>
          وجه در صندوق ثبت می‌شود. بنابراین شما باید نام بانک‌ها و صندوق‌های خود
          را در سیستم ثبت کنید.
        </p>
        <div className='flex flex-col sm:flex-row justify-between gap-4 mt-4'>
          <button
            onClick={() => (location.href = '/finance/banks/add')}
            className='fill-button min-w-56 rounded-lg h-10 px-6'
          >
            ثبت حساب بانکی
          </button>
          <button
            onClick={() => (location.href = '/finance/cache/add')}
            className='fill-button min-w-56 rounded-lg h-10 px-6'
          >
            ثبت صندوق
          </button>
        </div>
        <button
          onClick={changeStep}
          className='border-button rounded-lg h-10 px-6'
        >
          مرحله بعد
        </button>
      </div>
      <Image alt='' src={'/images/finance.png'} width={400} height={300} />
    </div>
  )
}

export default Finance
