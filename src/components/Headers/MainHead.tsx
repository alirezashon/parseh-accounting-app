'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Action {
  icon: any
  act?: () => void
  label?: string
}

const MainHead = ({
  icons,
}: {
  icons?: {
    icon: any
    destination?: string
    act?: () => void
    label?: string
    subList?: Action[]
  }[]
}) => {
  const [headerHeight, setHeaderHeight] = useState<number>(10)
  const [isHovering, setIsHovering] = useState(false)
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

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
    <div className='w-full flex justify-center'>
      <div
        style={{ height: `${headerHeight}vh`, transition: 'height 0.4s' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed w-[92%] xl:w-[80%] z-[25] top-0 xl:rounded-b-2xl rounded-t-2xl bg-white text-white border-b-4 border-[#2f27ce] flex items-start justify-between px-4 shadow-md`}
      >
        {/* لوگو */}
        <div className='flex items-center justify-center h-full py-2'>
          <Image
            src='/images/logo.png'
            width={headerHeight > 14 ? 200 : 145}
            height={headerHeight > 14 ? 220 : 65}
            alt='logo'
            className='transition-all duration-300'
          />
        </div>

        {/* آیکون‌ها */}
        <div className='flex-1 flex justify-end items-start gap-3 overflow-x-auto py-2 px-3'>
          {icons &&
            icons.map((icon, index) => {
              const isActive = pathname.includes(`${icon.destination}`)
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (icon.act) icon.act()
                    else if (icon.destination)
                      window.location.href = icon.destination
                  }}
                  className={`flex flex-col items-center justify-center px-3 rounded-md text-sm transition-all duration-300
                    ${
                      isActive
                        ? 'bg-[#0f20a4] text-white border-b-4 border-blue-700'
                        : 'text-[#2f27ce]'
                    }
                    hover:bg-[#0f20a4] hover:text-white cursor-pointer`}
                >
                  <div className='text-3xl sm:text-2xl'>{icon.icon}</div>
                  {headerHeight > 13 && (
                    <div className='text-xs sm:text-sm font-semibold mt-1 whitespace-nowrap'>
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
