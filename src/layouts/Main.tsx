'use client' 
import Drawer from '@/components/Navigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow mb-20 pb-2'>
        <Drawer />
        <div className='absolute right-[9%] max-xl:right-0 max-sm:right-0 w-[100vw] max-w-7xl max-w-sm:w-full min-h-screen bg-white border border-[#dbeafe] rounded-b-2xl px-12 max-sm:px-1 py-24'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
