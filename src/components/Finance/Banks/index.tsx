import MainHead from '@/components/Headers/MainHead'
import MainLayout from '@/layouts/Main'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory, MdOutlineAddCard } from 'react-icons/md'

const Banks = () => {
  return (
    <MainLayout>
      <MainHead
        title="لیست بانک ها"
        icons={[
          {
            icon: <HiClipboardDocumentList size={30} />,
            label: 'لیست بانک ها',
            destination: '/banks',
          },
          {
            icon: <MdOutlineAddCard size={30} />,
            label: 'افزودن حساب بانکی',
            destination: '/accounting/add',
          },
          {
            icon: <MdCategory size={30} />,
            label: 'جدول حساب ها',
            destination: '/accounting/acctypes',
          },
        ]}
      />
    </MainLayout>
  )
}

export default Banks
