'use client'
import { CSSProperties, useState, useEffect } from 'react'
import externalStyles from './index.module.css'
import { RiContactsBookFill } from 'react-icons/ri'
import { GiMechanicalArm, GiTakeMyMoney } from 'react-icons/gi'
import { FaChartPie, FaDiagramProject } from 'react-icons/fa6'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { IoDocumentAttach } from 'react-icons/io5'
import { AiFillSetting } from 'react-icons/ai'

const Drawer = () => {
  const [drawerWidth, setDrawerWidth] = useState<number>(20)
  const [isMouseOverDrawer, setIsMouseOverDrawer] = useState<boolean>(false)
  const [pathname, setPathname] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  const icons = [
    { tag: <RiContactsBookFill />, name: 'کاربرها', destination: '/persons' },
    { tag: <GiTakeMyMoney />, name: 'مالی ', destination: '/finance' },
    { tag: <GiMechanicalArm />, name: 'خدمات', destination: '/services' },
    { tag: <IoDocumentAttach />, name: 'اسناد', destination: '/accounting' },
    { tag: <FaChartPie />, name: ' گزارش ها', destination: '/reports' },
    {
      tag: <BsDatabaseFillGear />,
      name: 'کسب و کار',
      destination: '/bussines',
    },
    { tag: <FaDiagramProject />, name: 'ارتباطات', destination: '/relations' },
    { tag: <AiFillSetting />, name: 'تنظیمات', destination: '/setting' },
  ]

  const handleMouseEnter = () => {
    setIsMouseOverDrawer(true)
  }

  const handleMouseLeave = () => {
    setIsMouseOverDrawer(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMouseOverDrawer) {
      interval = setInterval(() => {
        setDrawerWidth((prev) =>
          Math.min(prev + 1, window.innerWidth > 999 ? 20 : 84)
        )
      }, 10)
    } else {
      interval = setInterval(() => {
        setDrawerWidth((prev) =>
          Math.max(prev - 1, window.innerWidth > 999 ? 6 : 10)
        )
      }, 10)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isMouseOverDrawer])

  const styles: Record<string, CSSProperties> = {
    drawer: {
      transition: 'width 1s',
      width: `${drawerWidth}%`,
      display: 'flex',
      height: '120vh',
      zIndex: 40,
    },
    iconName: {
      display: `${drawerWidth > 13 ? 'block' : 'none'}`,
    },
    tag: { border: 'none' },
    item: {},
  }

  return (
    <div
      style={styles.drawer}
      className={externalStyles.drawer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.item} className={externalStyles.item}>
        {icons.map((icon, index) => (
          <div
            onClick={() => (window.location.href = icon.destination)}
            className={`${externalStyles.iconBox}`}
            style={{
              
              justifyContent: `${drawerWidth < 7 ? 'center' : 'space-around'}`,
              background: pathname.includes(icon.destination) ? '#0f20a4' : '',
              color: pathname.includes(icon.destination) ? '#ffffff' : '',
              borderBlock: pathname.includes(icon.destination)
                ? '1vh blue ridge'
                : '',
            }}
            key={index}
          >
            <div className={externalStyles.icon} style={styles.tag}>
              {icon.tag}
            </div>
            <div style={styles.iconName} className={externalStyles.iconName}>
              {icon.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drawer
