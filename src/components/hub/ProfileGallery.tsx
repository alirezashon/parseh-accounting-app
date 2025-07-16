'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { IoAddCircleOutline } from 'react-icons/io5'
import { PiPencil } from 'react-icons/pi'
import { useStates } from '@/context/States'

const ProfileGallery = ({
  uploadImage,
}: {
  uploadImage: (value: FormData) => Promise<boolean>
}) => {
  const { showModal } = useStates()
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'done'
  >('idle')
  const [draftSrc, setDraftSrc] = useState<string>()

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isImage = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
    const isSizeValid = file.size >= 50000 && file.size <= 2200000

    if (!isImage || !isSizeValid) {
      showModal({
        type: 'error',
        title: 'خطا',
        main: (
          <p>
            {!isImage
              ? 'پسوند فایل قابل قبول نیست'
              : file.size < 50000
              ? 'حجم فایل کمتر از حد مجاز است'
              : 'حجم فایل بیشتر از حد مجاز است'}
          </p>
        ),
        autoClose: 2,
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const preview = reader.result as string
      setDraftSrc(preview)
      setUploadStatus('uploading')

      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadImage(formData)
      if (result) setUploadStatus('done')
      else {
        setUploadStatus('idle')
        setDraftSrc(undefined)
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className='w-full max-w-[200px] flex flex-col items-center gap-2 text-sm'>
      <label htmlFor='avatarUpload' className='cursor-pointer'>
        <Image
          className='rounded-full object-cover border border-gray-300'
          src={draftSrc || '/images/womanProfile.png'}
          alt='پروفایل'
          width={170}
          height={170}
        />
      </label>

      <div className='flex w-full gap-5 justify-center items-center mt-2'>
        <IoAddCircleOutline
          className='cursor-pointer text-[#2F27CE] hover:text-[#496433]'
          size={24}
        />
        <PiPencil
          className='cursor-pointer text-[#999c9b] hover:text-[#ffee00]'
          size={24}
        />
        <BiTrash
          className='cursor-pointer text-[#db1717] hover:text-[#884c4c]'
          onClick={() => {
            setDraftSrc(undefined)
            setUploadStatus('idle')
          }}
          size={24}
        />
      </div>
      {uploadStatus === 'done' && (
        <p className='text-green-500 text-xs'>✅ تصویر با موفقیت بارگذاری شد</p>
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
