'use client'

import ProfileGallery from '@/components/hub/ProfileGallery'
import { getCookieByKey } from '@/utils/cookies'
import { useState } from 'react'

const AddPersons = () => {
  const [formData, setFormData] = useState<{ accountcode: string }>()
  const UploadImage = async (formData: FormData): Promise<boolean> => {
    try {
      const accessToken = (await getCookieByKey('access_token')) || ''
      const result = ''
      //  await AddDraftImage({
      //   src: formData,
      //   accessToken,
      // })
      if (result) {
        // refs.current.cheque_id_file = result.rec_id_file
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <ProfileGallery uploadImage={UploadImage} />
        <div className='flex'>
          <input value={formData?.accountcode} onChange={(e)=>setFormData({...formData,})} />
        </div>
      </div>
    </div>
  )
}

export default AddPersons
