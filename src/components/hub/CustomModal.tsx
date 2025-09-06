import { ReactNode, useEffect, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { CiWarning } from 'react-icons/ci'
import { IoCloseCircle } from 'react-icons/io5'
import { TiTick } from 'react-icons/ti'

const CustomModal = ({
  modalContent,
  closeModal,
}: {
  modalContent: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null
  closeModal: () => void
}) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (modalContent?.autoClose) {
      const startTime = performance.now()

      const updateProgress = (time: number) => {
        const elapsed = time - startTime
        // محاسبه درصد کاهش به اندازه 2 درصد
        const percentage = Math.max(
          100 -
            (elapsed / (parseInt(`${modalContent?.autoClose}`) * 1000)) * 50,
          0
        ) // 50 را جایگزین 100 می‌کنیم تا کاهش درصد دو برابر شود
        setProgress(percentage)

        if (percentage > 0) {
          requestAnimationFrame(updateProgress)
        } else {
          closeModal()
        }
      }

      const animationFrame = requestAnimationFrame(updateProgress)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [modalContent, closeModal])
  return (
    <div
      className="fixed inset-0 flex justify-center items-center "
      style={{ zIndex: '60' }}
    >
      {/* بک‌دراپ */}
      <div className="absolute bg-slate-600 opacity-50 w-full h-full z-40 top-0 right-0"></div>
      {/* جعبه مودال */}
      <div className="p-10 rounded-lg max-md:w-[100%] w-[40vw] z-50 right-side-animate bg-white border border-gray-300 shadow-lg transition-transform duration-700 ease-in-out">
        {/* هدر مودال */}
        <div className="flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full">
          <div className="flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full">
            {modalContent?.title}
          </div>
          <AiFillCloseSquare
            size={24}
            cursor="pointer"
            color="#50545F"
            onClick={closeModal}
          />
        </div>
        <div className="flex justify-center mb-5">
          {modalContent?.type === 'success' ? (
            <TiTick size={44} color="#0f973d" />
          ) : modalContent?.type === 'error' ? (
            <IoCloseCircle size={44} color="#d42620" />
          ) : (
            <CiWarning size={44} color="#cda125" />
          )}
        </div>
        {/* نمایش Progress Bar در صورت وجود autoClose */}
        {modalContent?.main}
        {!modalContent?.hideButton && (
          <button
            type="button"
            className="w-full mt-10 px-4 py-2 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800"
            onClick={closeModal}
          >
            بستن
          </button>
        )}
        {modalContent?.autoClose && (
          <div className="w-full bg-gray-200 h-1 mt-10 overflow-hidden">
            <div
              className="bg-purple-600 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomModal
