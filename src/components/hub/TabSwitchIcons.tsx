'use client'

import { useEffect, useState } from 'react'

type TabItem = {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

type Props = {
  tabs: TabItem[]
  defaultTabId?: string
}

const TabsWithIcons = ({ tabs, defaultTabId }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={''}>
      {/* نوار تب‌ها */}
      <div className='relative w-full border-b border-gray-300'>
        <div
          className={`flex ${isMobile ? 'relative h-12 overflow-hidden' : ''}`}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex text-nowrap bg-white cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-all duration-200
                ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#2F27CE] text-[#2F27CE] bg-white z-10 shadow-md'
                    : 'border-b-2 border-transparent text-gray-500'
                }`}
              style={{
                marginRight: isMobile && i !== 0 ? -25 : 0,
                position: isMobile ? 'relative' : 'static',
              }}
            >
              <span className='text-xl'>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* محتوای تب فعال */}
      <div className='mt-6'>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default TabsWithIcons
