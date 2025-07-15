import Image from 'next/image'

const Persons = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-7'>
        <h1 className='font-bold text-2xl'> ثبت اشخاص</h1>
        <p>
          اولین قدم برای کار با سیستم حسابداری، ثبت اشخاص طرف حساب شماست. این
          اشخاص می توانند، مشتریان، تامین کنندگان، سهامداران، کارکنان و یا
          بازاریابان کسب و کار شما باشند.
        </p>
        <p className='text-blue-700'>
          شما می توانید اشخاص را به صورت تک تک یا در قالب فایل اکسل و به صورت
          یکباره در سیستم ثبت کنید.
        </p>
        <div className='flex gap-5 mt-6 text-right'>
          <button
            onClick={() => alert('bib bib')}
            className='fill-button rounded-lg h-10 min-w-40'
          >
            ثبت شخص
          </button>
          <button
            onClick={changeStep}
            className='border-button rounded-lg h-10 min-w-40'
          >
            مرحله بعدی
          </button>
        </div>
      </div>
      <Image alt='' src={'/images/image.png'} width={600} height={600} />
    </div>
  )
}

export default Persons
