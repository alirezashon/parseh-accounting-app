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
          className={`w-10 h-5 border-3 border-[#122dfe] shadow-2xs shadow-blue-300 ${
            isActive
              ? 'bg-gradient-to-r from-[#267ee8] to-blue-700 shadow-md'
              : 'bg-[#878FA4]'
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
