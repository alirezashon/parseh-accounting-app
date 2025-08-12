'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaCircleLeft } from 'react-icons/fa6'

interface Action {
  icon: any
  act?: () => void
  label?: string
}

const MainHead = ({
  icons,
  title,
}: {
  title?: string
  icons?: {
    icon: any
    destination?: string
    act?: () => void
    label?: string
    subList?: Action[]
  }[]
}) => {
  const [headerHeight, setHeaderHeight] = useState<number>(12)
  const [isHovering, setIsHovering] = useState(false)
  const [pathname, setPathname] = useState('')

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovering) {
      interval = setInterval(() => {
        setHeaderHeight((prev) => Math.min(prev + 1, 32))
      }, 15)
    } else {
      interval = setInterval(() => {
        setHeaderHeight((prev) => Math.max(prev - 1, 10))
      }, 15)
    }
    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div className="w-full flex justify-center">
      <div
        style={{ height: `${headerHeight}vh` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={` z-20
          fixed w-[90%] xl:w-[80%] 
          hover:z-50
          max-lg:bottom-0 min-lg:top-0 
          xl:rounded-b-2xl 
          bg-gradient-to-r from-blue-50 to-white
          border-b-4 border-[#2f27ce]
          flex items-end justify-between px-4 
          shadow-lg transition-all duration-300
        `}
      >
        <div className="flex items-center justify-center h-full py-2">
          <Image
            src="/images/logol.png"
            width={headerHeight > 14 ? 180 : 130}
            height={headerHeight > 14 ? 100 : 60}
            alt="logo"
            className="transition-all duration-300 drop-shadow-md"
          />
        </div>

        {/* عنوان */}
        {title && (
          <div
            className="fixed top-0 flex gap-4 max-lg:hidden border-4 border-t-0 border-blue-500 shadow-md 
            left-1/2 transform -translate-x-1/2 
            bg-white rounded-b-xl px-5 py-7 text-blue-700 
            text-2xl font-bold pointer-events-none"
          >
            <p>{title}</p>
            <FaCircleLeft
              onClick={() => router.back()}
              size={33}
              className="cursor-pointer hover:rotate-12"
            />
          </div>
        )}

        {/* آیکون‌ها */}
        <div className="flex justify-end items-start gap-3 overflow-x-auto py-2 px-3 scrollbar-hide">
          {icons?.map((icon, index) => {
            const isActive = pathname === `${icon.destination}`
            return (
              <div
                key={index}
                onClick={() => {
                  if (icon.act) icon.act()
                  else if (icon.destination) open(icon.destination)
                }}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg text-sm transition-all duration-300
                  ${
                    isActive
                      ? 'bg-[#0f20a4] text-white border-b-4 border-blue-700'
                      : 'text-[#2f27ce] bg-white/60'
                  }
                  hover:bg-[#0f20a4] hover:text-white cursor-pointer shadow-sm`}
              >
                <div className="text-2xl">{icon.icon}</div>
                {headerHeight > 13 && (
                  <div className="text-xs sm:text-sm font-semibold mt-1 whitespace-nowrap">
                    {icon.label}
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
