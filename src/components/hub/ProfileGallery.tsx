import { useStates } from '@/context/States'
import Image from 'next/image'
import { useState } from 'react'
import { BiCheck, BiTrash } from 'react-icons/bi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { GrDocumentUpload } from 'react-icons/gr'
import { IoAddCircleOutline } from 'react-icons/io5'
import { PiPencil } from 'react-icons/pi'

const ProfileGallery = ({
  uploadImage,
}: {
  uploadImage: (value: FormData) => Promise<boolean>
}) => {
  const { showModal } = useStates()
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error' | 'showImage'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [draftSrc, setDraftSrc] = useState<string>()

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(`${file?.type}`)) {
      showModal({
        type: 'error',
        main: <p>پسوند فایل قابل قبول نمی باشد</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size < 50000) {
      showModal({
        type: 'error',
        main: <p>حجم فایل کمتر از حد مجاز است</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size > 2200000) {
      showModal({
        type: 'error',
        main: <p>حجم فایل بیشتر از حد مجاز است</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      setUploadStatus('uploading')
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const newAvatarUrl = reader.result as string
          setDraftSrc(newAvatarUrl)
          setUploadStatus('showImage')

          let progressValue = 0
          const interval = setInterval(() => {
            if (progressValue >= 100) {
              clearInterval(interval)
              setProgress(100)
            } else {
              progressValue += 10
              setProgress(progressValue)
            }
          }, 200)
          const result = uploadImage(formData)
          if (!result) setDraftSrc('')
        } catch (error) {
          setUploadStatus('error')
          showModal({
            type: 'error',
            main: <p>خطا در بارگذاری</p>,
            title: 'خطا',
            autoClose: 2,
          })
          return error
        }
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className='flex gap-5'>
      {draftSrc ? (
        <div
          className={`gap-5 w-full p-5 rounded-lg flex flex-col justify-center items-center border 
      border-[#C9D0D8] border-dashed
      text-[#50545F] cursor-pointer my-6`}
        >
          {uploadStatus === 'showImage' && (
            <div
              className={`gap-5 w-full p-5 rounded-lg flex justify-center items-center cursor-pointer my-6`}
            >
              <Image
                src={draftSrc}
                width={77}
                height={77}
                className='w-full max-w-96'
                alt='Uploaded file preview'
              />
            </div>
          )}
          <div className='flex justify-between w-full items-center'>
            <div className='flex gap-3'>
              <BiCheck
                size={24}
                className='bg-[#0F973D] text-white rounded-full'
              />
              <p className='text-green-500 mt-2 text-sm'>
                بارگذاری با موفقیت انجام شد
              </p>
            </div>

            <div className='flex gap-3'>
              {uploadStatus === 'success' ? (
                <BsEye
                  onClick={() => setUploadStatus('showImage')}
                  color='#2F27CE'
                  size={24}
                />
              ) : (
                <BsEyeSlash
                  onClick={() => setUploadStatus('success')}
                  color='#2F27CE'
                  size={24}
                />
              )}
              <BiTrash
                size={24}
                color='#BB1F1A'
                onClick={() => {
                  setDraftSrc(undefined)
                  setUploadStatus('idle')
                }}
              />

              {uploadStatus === 'error' && (
                <p className='text-red-500 mt-2 text-sm'>
                  خطا در بارگذاری فایل
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <label htmlFor='avatarUpload '>
          <Image
            className={'rounded-full'}
            src={'/images/contact.jpg'}
            alt=''
            width={444}
            height={444}
          />
          <div className='flex w-full justify-between items-center mt-2'>
            <IoAddCircleOutline
              className='cursor-pointer text-[#2F27CE] hover:text-[#496433]'
              size={44}
            />
            <PiPencil
              className='cursor-pointer text-[#999c9b] hover:text-[#ffee00]'
              size={44}
            />
            <BiTrash
              className='cursor-pointer text-[#db1717] hover:text-[#884c4c]'
              size={44}
            />
          </div>
        </label>
      )}
      <input
        id='avatarUpload'
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageUpload}
      />
    </div>
  )
}

export default ProfileGallery
