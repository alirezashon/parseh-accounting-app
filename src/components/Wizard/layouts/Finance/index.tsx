import Image from 'next/image'

const Finance = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-7'>
        <h1 className='font-bold text-2xl'> بانکداری</h1>
        <p>
          ثبت بانک ها و صندوق ها زمانی که مشتری مبلغی را با کارت بانکی پرداخت می
          کند، وجه به حساب بانکی شما واریز می گردد ولی اگر پول نقد پرداخت
        </p>
        <p className='text-blue-700'>
          کند وجه در صندوق ثبت می شود. بنابراین شما باید نام بانک ها و صندوق های
          خود را در
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
  )
}

export default Finance
