import Image from 'next/image'

const Shareholders = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-7'>
        <h1 className='font-bold text-2xl'> ثبت سهامداران </h1>
        <p>
          سهامداران کسب و کار شما، اشخاصی هستند که در کسب و کار شما سرمایه گذاری
          کرده اند. این افراد در واقع شرکای کاری شما هستند.{' '}
        </p>
        <p className='text-blue-700'>
          {' '}
          ممکن است شما شریک نداشته باشید و خود مالک کسب و کار باشید. در این صورت
          تنها سهامدار خودتان هستید و درصد سهام شما ۱۰۰ درصد است.
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
      <Image alt='' src={'/images/image.png'} width={600} height={600} />
    </div>
  )
}

export default Shareholders
