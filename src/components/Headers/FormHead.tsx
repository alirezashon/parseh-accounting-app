import { useRouter } from 'next/navigation'
import { FaCircleLeft } from 'react-icons/fa6'

const FormHead = () => {
  const router = useRouter()
  return (
    <div className='flex justify-end px-5 border-2 border-t-0 border-[#2f27ce6b] rounded-b-lg shadow-[#2F27CE] shadow-xs hover:bg-[#ceedf8] cursor-grab   text-[#2F27CE] bg-white py-3 fixed top-0 min-w-8/12 left-1/6'>
      <FaCircleLeft
        onClick={() => router.back()}
        size={33}
        className='cursor-pointer hover:rotate-12'
      />
    </div>
  )
}

export default FormHead
