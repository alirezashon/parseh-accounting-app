'use client'
import { useState, useEffect } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaChartPie, FaDiagramProject } from 'react-icons/fa6'
import { GiMechanicalArm, GiTakeMyMoney } from 'react-icons/gi'
import { IoDocumentAttach } from 'react-icons/io5'
import { RiContactsBookFill } from 'react-icons/ri'

const MainHead = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(10)
  const [isHovering, setIsHovering] = useState(false)
  const [pathname, setPathname] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  const icons = [
    {
      tag: <RiContactsBookFill size={30} />,
      name: 'کاربرها',
      destination: '/persons',
    },
    { tag: <GiTakeMyMoney size={30} />, name: 'مالی', destination: '/finance' },
    {
      tag: <GiMechanicalArm size={30} />,
      name: 'خدمات',
      destination: '/services',
    },
    {
      tag: <IoDocumentAttach size={30} />,
      name: 'اسناد',
      destination: '/documents',
    },
    {
      tag: <FaChartPie size={30} />,
      name: 'گزارش‌ها',
      destination: '/reports',
    },
    {
      tag: <BsDatabaseFillGear size={30} />,
      name: 'کسب‌و‌کار',
      destination: '/bussines',
    },
    {
      tag: <FaDiagramProject size={30} />,
      name: 'ارتباطات',
      destination: '/relations',
    },
    {
      tag: <AiFillSetting size={30} />,
      name: 'تنظیمات',
      destination: '/setting',
    },
  ]

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHovering) {
      interval = setInterval(() => {
        setHeaderHeight((prev) => Math.min(prev + 1, 25))
      }, 10)
    } else {
      interval = setInterval(() => {
        setHeaderHeight((prev) => Math.max(prev - 1, 8))
      }, 10)
    }

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div className='w-full flex min-xl:justify-center max-xl:justify-end '>
      <div
        style={{ height: `${headerHeight}vh`, transition: 'height 0.4s' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed max-xl:w-[92%] max-lg:w-[87%]  justify-center min-xl:top-0 max-xl:bottom-0  z-[70] max-xl:rounded-t-2xl min-xl:rounded-b-2xl bg-white  text-white max-xl:border-t-4 min-xl:border-b-4 border-[#2f27ce] flex items-start px-4 shadow-md`}
      >
        <div className='px-5 flex flex-wrap gap-7 items-start overflow-x-auto py-2'>
          {icons.map((icon, index) => {
            const isActive = pathname.includes(icon.destination)
            return (
              <div
                key={index}
                onClick={() => (window.location.href = icon.destination)}
                className={`flex flex-col items-center justify-center px-4  rounded-md text-sm transition-all duration-300
                ${
                  isActive
                    ? 'bg-[#0f20a4] text-white border-b-4 border-blue-700'
                    : 'text-[#2f27ce]'
                }
                hover:bg-[#0f20a4] hover:text-white cursor-pointer`}
              >
                <div className='text-4xl sm:text-2xl'>{icon.tag}</div>
                {headerHeight > 13 && (
                  <div className='text-xs sm:text-sm font-semibold mt-1'>
                    {icon.name}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainHead
