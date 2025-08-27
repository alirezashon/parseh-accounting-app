'use client'

import { useEffect, useState } from 'react'
import { getCookieByKey, setCookieByKey } from '@/utils/cookies'
import Start from './layouts/Start'
import Persons from './layouts/Persons'
import Shareholders from './layouts/Shareholders'
import Resources from './layouts/Resources'
import Finance from './layouts/Finance'
import OpeningBalance from './layouts/OpeningBalance'
import End from './layouts/End'
import MainHead from '../Headers/MainHead'
import { AiFillSetting } from 'react-icons/ai'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaChartPie, FaDiagramProject } from 'react-icons/fa6'
import { GiMechanicalArm, GiTakeMyMoney } from 'react-icons/gi'
import { IoDocumentAttach } from 'react-icons/io5'
import { RiContactsBookFill } from 'react-icons/ri'
import MainLayout from '@/layouts/Main'
const WizardHandler = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const cookieKey = 'koloche'
  const steps = [
    {
      title: 'شروع',
      content: <Start changeStep={() => setCurrentStep(1)} />,
    },
    {
      title: 'اشخاص',
      content: <Persons changeStep={() => setCurrentStep(2)} />,
    },
    {
      title: 'سهامداران',
      content: <Shareholders changeStep={() => setCurrentStep(3)} />,
    },
    {
      title: 'کالا / خدمت',
      content: <Resources changeStep={() => setCurrentStep(4)} />,
    },
    {
      title: 'بانکداری',
      content: <Finance changeStep={() => setCurrentStep(5)} />,
    },
    {
      title: 'تراز افتتاحیه',
      content: <OpeningBalance changeStep={() => setCurrentStep(6)} />,
    },
    { title: 'پایان', content: <End changeStep={() => setCurrentStep(5)} /> },
  ]
  useEffect(() => {
    const savedStep = getCookieByKey(`${cookieKey}-current`)
    const savedCompleted = getCookieByKey(`${cookieKey}-completed`)
    if (savedStep) setCurrentStep(Number(savedStep))
    if (savedCompleted) {
      try {
        setCompletedSteps(JSON.parse(savedCompleted))
      } catch {
        setCompletedSteps([])
      }
    }
  }, [cookieKey])

  useEffect(() => {
    setCookieByKey(`${cookieKey}-current`, String(currentStep))
    setCookieByKey(`${cookieKey}-completed`, JSON.stringify(completedSteps))
  }, [currentStep, completedSteps, cookieKey])

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <MainLayout>
      <MainHead
        icons={[
          {
            icon: <RiContactsBookFill size={30} />,
            label: 'کاربرها',
            destination: '/persons',
          },
          {
            icon: <GiTakeMyMoney size={30} />,
            label: 'مالی',
            destination: '/finance',
          },
          {
            icon: <GiMechanicalArm size={30} />,
            label: 'خدمات',
            destination: '/services',
          },
          {
            icon: <IoDocumentAttach size={30} />,
            label: 'اسناد',
            destination: '/documents',
          },
          {
            icon: <FaChartPie size={30} />,
            label: 'گزارش‌ها',
            destination: '/reports',
          },
          {
            icon: <BsDatabaseFillGear size={30} />,
            label: 'کسب‌و‌کار',
            destination: '/bussines',
          },
          {
            icon: <FaDiagramProject size={30} />,
            label: 'ارتباطات',
            destination: '/relations',
          },
          {
            icon: <AiFillSetting size={30} />,
            label: 'تنظیمات',
            destination: '/setting',
          },
        ]}
      />

      <div className="w-full p-2  bg-white">
        <div className="flex justify-between mb-6">
          <div className="relative w-full mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#C9D0D8] z-0 transform -translate-y-1/2 rounded-full" />

            <div
              className="absolute top-1/2 right-0 h-1 bg-[#2f27ce] z-10 transform -translate-y-1/2 transition-all duration-300 rounded-full"
              style={{
                width: `
                 ${
                   currentStep === 0
                     ? 8
                     : currentStep === 1
                     ? 20
                     : currentStep === 2
                     ? 35
                     : currentStep === 3
                     ? 48
                     : currentStep === 4
                     ? 65
                     : currentStep === 5
                     ? 80
                     : 100
                 }% `,
              }}
            />

            <div className="relative   z-20 h-fit p-1 overflow-auto flex justify-around flex-wrap sm:flex-nowrap sm:overflow-x-auto gap-1">
              {steps.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[60px] flex-shrink-0"
                >
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center mt-5 rounded-full border border-white cursor-pointer text-white text-xs sm:text-sm font-bold ${
                      currentStep >= index
                        ? 'bg-[#2f27ce]'
                        : 'bg-[#C9D0D8] text-[#50545F]'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-1 text-[10px] sm:text-sm text-[#2f27ce] text-center">
                    {section.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-4 rounded shadow min-h-[400px]">
          {steps[currentStep].content}
        </div>
      </div>
    </MainLayout>
  )
}

export default WizardHandler
