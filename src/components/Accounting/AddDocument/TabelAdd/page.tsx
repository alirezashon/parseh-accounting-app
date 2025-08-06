'use client'

import { useEffect, useState } from 'react'
import { getCookieByKey } from '@/actions/cookieToken'
import {
  Detail,
  DetailedScheme,
  DetailTypeScheme,
  GeneralScheme,
  Header,
  SpecificScheme,
  VoucherTypeScheme,
} from '@/interfaces'
import { get_vouchertype, InsertEasyVoucher } from '@/services/voucher'
import { GetGenerals } from '@/services/general'
import { GetDetailTypes } from '@/services/detailTypes'
import { GetSpecifics } from '@/services/specific'
import { GetDetailed } from '@/services/detailed'



const defaultHeader: Header = {
  VoucherType: 1,
  FiscalYearRef: 1404,
  BranchRef: 0,
  Number: 0,
  Date: '',
  Description: '',
  Description_En: '',
  amount: 0,
  CurrencyRef: 0,
  trans_type: 1,
  Signature: '',
}

const defaultDetail: Detail = {
  RowNumber: 0,
  FollowUpNumber: '',
  FollowUpDate: '',
  Item_amount: 0,
  Item_percent: 0,
  AccountGroupRef: 0,
  GLRef: 0,
  SLRef: 0,
  SLCode: '',
  DLLevel4: '',
  DLLevel5: '',
  DLTypeRef4: 0,
  DLTypeRef5: 0,
  Description: '',
  Description_En: '',
  receiver_delivery: '',
  Quantity: 0,
}

const InsertVoucherForm = () => {
  const [initialsData, setInitialsData] = useState({
    voucherTypes: [] as VoucherTypeScheme[],
    glRef: [] as GeneralScheme[],
    slRef: [] as SpecificScheme[],
    detailTypes: [] as DetailTypeScheme[],
    detailed: [] as DetailedScheme[],
  })

  const [formData, setFormData] = useState({
    header: defaultHeader,
    details: [defaultDetail],
  })

  const selectFieldOptions: Partial<
    Record<keyof Header | keyof Detail, { label: string; value: number }[]>
  > = {
    VoucherType: initialsData.voucherTypes.map((v) => ({ label: v.Title, value: v.VoucherTypeID })),
    FiscalYearRef: [1403, 1404, 1405].map((y) => ({ label: `${y}`, value: y })),
    CurrencyRef: [
      { label: 'ریال', value: 1 },
      { label: 'دلار', value: 2 },
      { label: 'یورو', value: 3 },
    ],
    GLRef: initialsData.glRef.map((g) => ({ label: g.gl_title, value: g.gl_id })),
    SLRef: initialsData.slRef.map((s) => ({ label: s.sl_title, value: s.sl_id })),
    DLLevel4: initialsData.detailed.map((d) => ({ label: d.dl_title, value: d.dl_id })),
  }

  const handleChange = (
    section: 'header' | 'details',
    key: keyof Header | keyof Detail,
    value: string,
    rowIndex?: number
  ) => {
    const parsedValue = Number(value)
    const finalValue = isNaN(parsedValue) ? value : parsedValue
    if (section === 'header') {
      setFormData((prev) => ({
        ...prev,
        header: { ...prev.header, [key]: finalValue },
      }))
    } else if (section === 'details' && rowIndex !== undefined) {
      const updated = [...formData.details]
      updated[rowIndex] = { ...updated[rowIndex], [key]: finalValue }
      setFormData((prev) => ({ ...prev, details: updated }))
    }
  }

  const renderTableCell = (
    section: 'header' | 'details',
    key: keyof Header | keyof Detail,
    val: any,
    rowIndex?: number
  ) => {
    const isSelect = key in selectFieldOptions
    return isSelect ? (
      <select
        value={val ?? ''}
        onChange={(e) => handleChange(section, key, e.target.value, rowIndex)}
        className='w-full outline-none border px-2 py-1 rounded text-sm bg-white  '
      >
        <option value=''>انتخاب</option>
        {selectFieldOptions[key]?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        className='border px-2 py-1 rounded text-sm w-max'
        value={val ?? ''}
        onChange={(e) => handleChange(section, key, e.target.value, rowIndex)}
      />
    )
  }

  const fetchData = async () => {
    const accessToken = await getCookieByKey('access_token')
    const voucherTypes = await get_vouchertype({ accessToken })
    const generals = await GetGenerals({ accessToken })
    const detailTypes = await GetDetailTypes({ accessToken })
    const slRefs = generals?.[0] ? await GetSpecifics({ accessToken, gl_id: generals[0].gl_id }) : []
    const detailed = detailTypes?.[0] ? await GetDetailed({ accessToken, DLTypeID: detailTypes[0].DLTypeID }) : []

    setInitialsData({
      voucherTypes: voucherTypes || [],
      glRef: generals || [],
      slRef: slRefs || [],
      detailTypes: detailTypes || [],
      detailed: detailed || [],
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const inserto = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    await InsertEasyVoucher({
      accessToken,
      data: {
        header: formData.header,
        details: formData.details,
      },
    })
  }

  return (
    <div className='max-w-full overflow-x-auto p-4 space-y-6'>
      <h2 className='text-xl font-bold'>ورود اطلاعات سند</h2>
      <div className='min-w-[1000px]'>
        <table className='border text-sm w-full'>
          <thead>
            <tr className='bg-blue-100'>
              {Object.keys(formData.header).map((key) => (
                <th key={key} className='border p-1 whitespace-nowrap'>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.entries(formData.header).map(([key, val]) => (
                <td key={key} className='border p-1'>
                  {renderTableCell('header', key as keyof Header, val)}
                </td>
              ))}
            </tr>
            <tr className='bg-blue-100'>
              {Object.keys(defaultDetail).map((key) => (
                <th key={key} className='border p-1 whitespace-nowrap'>
                  {key}
                </th>
              ))}
            </tr>
            {formData.details.map((detail, i) => (
              <tr key={i}>
                {Object.entries(detail).map(([key, val]) => (
                  <td key={key} className='border p-1'>
                    {renderTableCell('details', key as keyof Detail, val, i)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex gap-4'>
        <button
          className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              details: [...prev.details, { ...defaultDetail }],
            }))
          }
        >
          + سطر جدید
        </button>
        <button
          onClick={inserto}
          className='mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          ثبت سند
        </button>
      </div>
    </div>
  )
}

export default InsertVoucherForm
