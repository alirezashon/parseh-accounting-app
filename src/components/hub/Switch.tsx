const Switch = ({
  setIsActive,
  isActive,
  id,
}: {
  setIsActive: (isactive: boolean) => void
  isActive: boolean
  id?: string
}) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        className='sr-only'
        id={`checkbox-${id}`}
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
      <label htmlFor={`checkbox-${id}`} className='cursor-pointer'>
        <div
          className={`w-10 h-5 ${
            isActive ? 'bg-[#2F27CE]' : 'bg-[#878FA4]'
          } rounded-full p-1 flex items-center`}
        >
          <div
            className={`w-4 h-4 bg-[#ffffff] rounded-full transition-transform transform ${
              isActive ? 'translate-x-[-100%]' : ''
            }`}
          />
        </div>
      </label>
    </div>
  )
}

export default Switch
