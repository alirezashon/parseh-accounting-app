'use client'
import { useState } from 'react'
type TabItem = {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}
type Props = {
  tabs: TabItem[]
  defaultTabId?: string
  className?: string
}
const TabsWithIcons = ({ tabs, defaultTabId, className }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)
  return (
    <div className={className}>
      <div className='flex border-b '>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition cursor-pointer
              ${
                activeTab === tab.id
                  ? 'border-[#2F27CE] text-[#2F27CE]'
                  : 'border-transparent text-gray-500 hover:text-[#2F27CE]'
              }`}
          >
            <span className='text-xl'>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className='mt-4'>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
export default TabsWithIcons
