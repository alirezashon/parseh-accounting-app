import MainHead from '@/components/Headers/MainHead'
import Wizard from '@/components/Wizard'
import MainLayout from '@/layouts/Main'

const page = () => {
  return (
    <MainLayout>
      <MainHead/>
      <Wizard />
    </MainLayout>
  )
}

export default page
