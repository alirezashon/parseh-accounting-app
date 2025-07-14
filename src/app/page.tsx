import Wizard from '@/components/Wizard'

const page = () => {
  const steps = [
    {
      title: 'شروع',
      content: (
        <div>
          سلام! به حسابفا خوش آمدید😀 در این راهنمای قدم به قدم، به شما کمک می
          کنیم تا سیستم حسابداری خود را راه اندازی کنید. اگر قبلا تجربه کار با
          حسابفا را داشته اید، می توانید این راهنما را ببندید. در ضمن شما می
          توانید با مراجعه به صفحه خودآموزهای ویدئویی حسابفا، کار با نرم افزار
          را از طریق آموزش های ویدئویی یاد بگیرید.
        </div>
      ),
    },
    { title: 'اشخاص', content: <div>فرم تماس...</div> },
    { title: 'سهامداران', content: <div>بررسی و تأیید...</div> },
    { title: 'کالا ها', content: <div>بررسی و تأیید...</div> },
    { title: 'بانکداری', content: <div>بررسی و تأیید...</div> },
    { title: 'تراز افتتاحیه', content: <div>بررسی و تأیید...</div> },
    { title: 'پایان', content: <div>بررسی و تأیید...</div> },
  ]
  return (
    <div>
      <Wizard steps={steps} cookieKey='my-form' />
    </div>
  )
}

export default page
