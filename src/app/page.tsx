import MainHead from '@/components/Headers/MainHead'
import Wizard from '@/components/Wizard'
import MainLayout from '@/layouts/Main'
import { AiFillSetting } from 'react-icons/ai'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaChartPie, FaDiagramProject } from 'react-icons/fa6'
import { GiMechanicalArm, GiTakeMyMoney } from 'react-icons/gi'
import { IoDocumentAttach } from 'react-icons/io5'
import { RiContactsBookFill } from 'react-icons/ri'
const page = () => {

  return (
    <MainLayout>
      <MainHead />
      <Wizard />
    </MainLayout>
  )
}

export default page
