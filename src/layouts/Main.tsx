'use client'
import Drawer from '@/components/Navigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex flex-col min-h-screen bg-red-200">
    <main className="w-full   bg-blue-700">
      <div className="right-0">
        <Drawer />
      </div>
      <div className=" right-[6%] max-md:right-[20%]    w-[95vw] mx-auto   min-h-screen bg-white border border-[#dbeafe] rounded-b-2xl px-12 max-sm:px-1 py-24">
        {children}
      </div>
    </main>
    //   </div>
  )
}

export default MainLayout
