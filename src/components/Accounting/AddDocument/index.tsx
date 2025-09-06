'use client'
import DocHead from './lib/FormHead'
import DocRows from './lib/FormRows'
import { useEffect, useState, useCallback, ReactNode } from 'react'
import { Header, Detail } from '@/interfaces'
import { InsertEasyVoucher } from '@/services/voucher'
import {
  deleteCookieByKey,
  getCookieByKey,
  setCookieByTagAndValue,
} from '@/actions/cookieToken'
import { FieldConfig, fieldList } from './lib/data'
import CustomModal from '@/components/hub/CustomModal'
const COOKIE_KEY = 'documentocachecookiemanashtobashhashrasht'

export default function AddDocument() {
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState<{
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null>()
  useEffect(() => setMounted(true), []) // ← NEW

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

  const setAndCache = useCallback(
    (
      updater: (prev: { header: Header; details: Detail[] }) => {
        header: Header
        details: Detail[]
      }
    ) => {
      setFinalData((prev) => updater(prev))
    },
    []
  )

  useEffect(() => {
    ;(async () => {
      const cache = await getCookieByKey(COOKIE_KEY)
      if (!cache) return
      try {
        setFinalData(JSON.parse(cache))
      } catch {}
    })()
  }, [])

  useEffect(() => {
    // فقط بعد از mount (کلاینت) کوکی بنویسیم تا SSR/CSR تفاوت نداشته باشن
    if (!mounted) return
    void setCookieByTagAndValue({
      key: COOKIE_KEY,
      value: JSON.stringify(finalData),
    })
  }, [finalData, mounted])

  const onSubmit = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    await InsertEasyVoucher({ data: finalData as any, accessToken }).then(
      async (result) => {
        if (result.status === 'success') {
          setShowModal({
            main: <p>با موفقیت ثبت شد</p>,
            title: 'موفق',
            type: 'success',
            autoClose: 2,
          })
          await deleteCookieByKey(COOKIE_KEY)
        } else
          setShowModal({
            main: <p> عملیات ناموفق بود </p>,
            title: 'ناموفق',
            type: 'error',
            autoClose: 2,
          })
      }
    )
  }

  if (!mounted) return null

  return (
    <div dir="rtl" className="grid gap-8 bg-white">
      {showModal && (
        <CustomModal
          modalContent={{
            main: <p></p>,
            title: '',
            type: 'success',
            autoClose: 2,
          }}
          closeModal={() => setShowModal(null)}
        />
      )}
      <DocHead
        value={finalData.header}
        onChange={(documentHead) => {
          setAndCache((prev) => ({ ...prev, header: documentHead }))
        }}
        data={fieldList.header as FieldConfig[]}
      />

      <DocRows
        value={finalData.details}
        onChange={(documentDetails) => {
          setAndCache((prev) => ({ ...prev, details: documentDetails }))
        }}
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
