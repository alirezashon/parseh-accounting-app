import { CiLocationArrow1 } from 'react-icons/ci'

const Divider = ({
  title,
  state,
  setState,
  className,
}: {
  title: string
  state?: string
  setState?: (value: string) => void
  className?: string
}) => (
  <div
    className={`${className}  mb-3 mt-10 border-b-2 border-blue-300 text-[#2F27CE] flex justify-between rounded-lg p-3 shadow-2xs shadow-blue-400`}
  >
    <h3 className="text-lg font-bold">{title}</h3>
    <CiLocationArrow1 className={`${typeof state === 'string' ? 'rotate-90' : 'hidden'} text-4xl rotate-90`} />
  </div>
)

export default Divider
