'use client'
import Image from 'next/image'

const Start = ({ changeStep }: { changeStep?: () => void }) => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center gap-6'>
      <div className='flex flex-col gap-7 text-right max-w-xl'>
        <h1 className='font-bold text-xl sm:text-2xl'>
          سلام! به حسابفا خوش آمدید 😀
        </h1>
        <p>
          در این راهنمای قدم به قدم، به شما کمک می‌کنیم تا سیستم حسابداری خود را
          راه‌اندازی کنید. اگر قبلاً تجربه کار با حسابفا را داشته‌اید، می‌توانید
          این راهنما را ببندید.
        </p>
        <p className='text-blue-700'>
          همچنین می‌توانید با مراجعه به صفحه‌ی خودآموزهای ویدئویی حسابفا، کار با
          نرم‌افزار را از طریق آموزش‌های تصویری یاد بگیرید.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
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
      <Image
        alt=''
        src={'/images/start.png'}
        width={600}
        height={600}
        className='w-full max-w-md'
      />
    </div>
  )
}

export default Start
