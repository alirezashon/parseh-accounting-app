'use client'

import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { getCookieByKey, setCookieByKey } from '@/utils/cookies'

type Step = {
  title: string
  content: React.ReactNode
}

type WizardProps = {
  steps: Step[]
  cookieKey?: string
}

const Wizard = ({ steps, cookieKey = 'wizard' }: WizardProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

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
    <div className='w-full max-w-3xl mx-auto p-4'>
      <div className='flex justify-between mb-6 gap-2'>
        <div className='w-full flex justify-around items-center mb-6 '>
          <div className='w-[50%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                currentStep > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
              }`}
            ></div>
          </div>
          {steps.map((section, index) => (
            <div className='flex flex-col items-center' key={index}>
              <div
                onClick={() => handleStepClick(index)}
                className={`w-10 h-10 z-30 p-6 flex items-center justify-center rounded-full border-4  border-white mt-5 cursor-pointer text-white ${
                  currentStep >= index 
                    ? ' bg-[#7747C0] '
                    : 'bg-[#C9D0D8] text-[#50545F]'
                }`}
              >
                {index + 1}
              </div>
              <p className=' text-[#7747C0]'>{section.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='border p-4 rounded shadow bg-white'>
        {steps[currentStep].content}

        <div className='mt-6 text-right'>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={markStepComplete}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              مرحله بعد
            </button>
          ) : (
            <span className='text-green-600 font-semibold'>
              🎉 فرم کامل شد!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wizard
