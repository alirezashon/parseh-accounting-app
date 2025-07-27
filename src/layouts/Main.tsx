'use client'
import Drawer from '@/components/Navigation'
import { useEffect, useState } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState<boolean>(true)
  const [contentId, setContentId] = useState<number>(0)
  useEffect(() => {
    setShowNav(
      ![
        /\/wallet\/withdraw$/,
        /\/wallet\/deposit$/,
        /\/wallet\/all$/,
        /receipt$/,
        /\/profile\/change-password$/,
        /\/clerk\/add$/,
      ].some((path) => path.test(window.location.pathname))
    )
    const handleHashChange = () => {
      location.hash.substring(1) === 'nvdwavshoh'
        ? setShowNav(false)
        : location.hash.substring(1) === 'dwavsh' && setShowNav(true)
    }
    window.addEventListener('hashchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [])
  return (
    <div className='flex flex-col min-h-screen'>
      {/* <Header /> */}
      {/* <Loader /> */}
      <main className='grow mb-20 pb-2'>
        <Drawer setDrawerOpen={setShowNav} />
        <div className='absolute right-[9%] max-xl:right-0 max-sm:right-0 w-[100vw] max-w-7xl max-w-sm:w-full min-h-screen bg-white border border-[#dbeafe] rounded-b-2xl px-12 max-sm:px-1 py-24'>
          {children}
        </div>
      </main>
      {/* {showNav && <NavigationLinks />} */}
    </div>
  )
}

export default MainLayout
