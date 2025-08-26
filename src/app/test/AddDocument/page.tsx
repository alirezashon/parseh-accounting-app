'use client'
import MainHead from '@/components/Headers/MainHead'
import { HiClipboardDocumentList, HiDocumentPlus } from 'react-icons/hi2'
import { MdCategory } from 'react-icons/md'
import DocHead from './lib/FormHead'
import DocRows from './lib/FormRows'
import { useState } from 'react'
import { Header, Detail } from '@/interfaces'
import { InsertEasyVoucher } from '@/services/voucher'
import { getCookieByKey } from '@/actions/cookieToken'

export default function AddDocument() {
  const [finalData, setFinalData] = useState<{
    header: Header
    details: Detail[]
  }>({
    header: {
      BranchRef: 0,
      Date: '',
      Number: 0,
      Sequence: 0,
      DailyNumber: 0,
      VoucherTypeRef: 0,
      IsCurrencyBased: 0,
      Description: '',
      Description_En: '',
      State: 0,
      IsTemporary: 0,
      IsExternal: 0,
      ReferenceNumber: 0,
      ShowCurrencyFields: 0,
      IsReadonly: 0,
      FiscalYearRef: 0,
      Signature: '',
    },
    details: [],
  })
  const onSubmit = async () => {
    console.log(finalData)
    if (!finalData) return
    console.table(finalData)
    const accessToken = (await getCookieByKey('access_token')) || ''
    await InsertEasyVoucher({ data: finalData as any, accessToken })
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
          setFinalData((prev) => ({
            ...prev,
            header: documentHead,
          }))
        }
      />
      <DocRows
        onChange={(documentDetails) =>
          setFinalData((prev) => ({
            ...prev,
            details: documentDetails,
          }))
        }
      />

      <div
        onClick={onSubmit}
        className="flex z-20 justify-center sticky bottom-1 items-center gap-2 rounded-lg px-2 py-2 text-sm bg-indigo-600 text-white hover:bg-[#2F27CE] active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        ثبت سند
      </div>
    </div>
  )
}
