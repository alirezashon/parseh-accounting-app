'use client'
import MainHead from '@/components/Headers/MainHead'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'
import DocHead from './lib/FormHead'
import DocRows from './lib/FormRows'
import { useState } from 'react'
import { Header, Detail } from '@/interfaces'
import { InsertEasyVoucher } from '@/services/voucher'

export default function AddDocument() {
  const [finalData, setFinalData] = useState<{
    header: Header
    details: Detail[]
  }>()
  const onSubmit = async () => {
    console.table(finalData)
    await InsertEasyVoucher({ data: finalData as any, accessToken: '' })
  }
  return (
    <div dir="rtl" className="grid gap-8 bg-white">
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
      <DocHead
        onChange={(documentHead) =>
          setFinalData({
            header: documentHead,
            details: finalData?.details || [],
          })
        }
      />
      <DocRows
        onChange={(documentDetails) =>
          setFinalData({
            header: finalData?.header as Header,
            details: documentDetails,
          })
        }
      />
      <div
        onClick={onSubmit}
        className="flex z-20 justify-center sticky bottom-0 items-center gap-2 rounded-lg px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        ثبت سند
      </div>
    </div>
  )
}
