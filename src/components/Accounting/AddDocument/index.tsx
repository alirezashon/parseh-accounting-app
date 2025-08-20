'use client'
import MainHead from '@/components/Headers/MainHead'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'
import DocHead from './lib/FormHead'
import DocRows from './lib/FormRows'

export default function AddDocument() {
  return (
    <div dir="rtl" className="grid gap-8 ">
      <MainHead
        title="ایجاد سند"
        icons={[
          {
            icon: <HiDocumentPlus size={28} />,
            label: 'سند جدید',
            destination: '/accounting/add',
          },
          {
            icon: <MdCategory size={28} />,
            label: 'جدول حساب‌ها',
            destination: '/accounting/acctypes',
          },
          {
            icon: <HiClipboardDocumentList size={28} />,
            label: 'لیست اسناد',
            destination: '/accounting',
          },
        ]}
      />
      <DocHead />
      <DocRows />
    </div>
  )
}
