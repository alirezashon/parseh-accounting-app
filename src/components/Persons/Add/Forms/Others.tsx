const Others = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <input
        className='input border rounded px-2 py-1'
        placeholder='کد اقتصادی'
      />
      <input
        className='input border rounded px-2 py-1'
        placeholder='شماره ثبت'
      />
      <input
        className='input border rounded px-2 py-1'
        placeholder='شناسه ملی'
      />
      <input className='input border rounded px-2 py-1' placeholder='کد شعبه' />
      <textarea
        className='input border rounded px-2 py-1 col-span-2'
        placeholder='توضیحات'
      />
    </div>
  )
}

export default Others
