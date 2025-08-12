import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaCircleLeft } from 'react-icons/fa6'
interface Action {
  icon: any
  act: () => void
  label?: string
}
const ListHead = ({
  formName,
  actions,
}: {
  formName?: string
  actions?: { icon: any; act: () => void; label?: string; subList?: Action[] }[]
}) => {
  const [showSublist, setShowSubList] = useState<Action[] | null>()

  const router = useRouter()

  return (
    <div className='flex justify-between z-30  px-5 border-2 border-t-0 border-[#2f27ce6b] rounded-b-lg shadow-[#2F27CE] shadow-xs hover:bg-[#ceedf8] cursor-grab   text-[#2F27CE] bg-white py-3 fixed top-0 min-w-8/12 left-1/6 max-lg:left-0 max-lg:w-full'>
      <div className='flex gap-4'>
        {actions?.map((action, index) => (
          <div
            key={index}
            className='flex flex-col items-center hover:border-b-2 transition-all duration-500'
            onMouseOver={() => {
              if (action.subList) setShowSubList(action.subList)
            }}
          >
            {action.icon}
            <p className='text-[8px] '>{action.label}</p>
          </div>
        ))}
        {showSublist && (
          <div
            onMouseLeave={() => setShowSubList(null)}
            className='absolute top-10 bg-white hover:shadow-sm border rounded-tl-[30px] rounded-b-sm border-t-0 shadow-2xs shadow-[#2F27CE] w-52 h-52'
          >
            {showSublist?.map((subItem, index) => (
              <div
                key={index}
                className={`${
                  index === 0 && 'rounded-tl-[52px]'
                } flex items-center gap-3 py-1 px-3 hover:border-b-2 hover:bg-blue-50  transition-all duration-500`}
              >
                {subItem.icon}
                <p className='  '>{subItem.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex gap-3'>
        <h1 className='text-2xl'>{formName}</h1>
        <FaCircleLeft
          onClick={() => router.back()}
          size={33}
          className='cursor-pointer hover:rotate-12'
        />
      </div>
    </div>
  )
}

export default ListHead
