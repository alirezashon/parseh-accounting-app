'use client'
import Image from 'next/image'

const Start = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-7'>
        <h1 className='font-bold text-2xl'>سلام! به حسابفا خوش آمدید😀</h1>
        <p>
          در این راهنمای قدم به قدم، به شما کمک می کنیم تا سیستم حسابداری خود را
          راه اندازی کنید. اگر قبلا تجربه کار با حسابفا را داشته اید، می توانید
          این راهنما را ببندید.
        </p>
        <p className='text-blue-700'>
          در ضمن شما می توانید با مراجعه به صفحه خودآموزهای ویدئویی حسابفا، کار
          با نرم افزار را از طریق آموزش های ویدئویی یاد بگیرید.
        </p>
        <div className='flex gap-5 mt-6 text-right'>
          <button
            onClick={changeStep}
            className='fill-button rounded-lg h-10 min-w-40'
          >
            مرحله بعد
          </button>
          <button
            onClick={() => alert('اخرج')}
            className='border-button rounded-lg h-10 min-w-40'
          >
            خروج
          </button>
        </div>
      </div>
      <Image alt='' src={'/images/image.png'} width={600} height={600} />
    </div>
  )
}

export default Start
