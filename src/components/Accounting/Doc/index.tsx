'use client'
import { getCookieByKey } from '@/actions/cookieToken'
import { Header, VoucherItem } from '@/interfaces'
import MainLayout from '@/layouts/Main'
import { GetVoucherItemList } from '@/services/voucher'
import { useEffect, useState } from 'react'
import EditableTable from '../hub/DetailedBlankTable'
import DocHead from '../AddDocument/lib/FormHead'
import { FieldConfig, fieldList } from '../AddDocument/lib/data'

const Document = () => {
  const [voucherItemList, setVoucherItemList] = useState<VoucherItem[]>([])
  const [documentHead, setDocumentHead] = useState<Header>()

  useEffect(() => {
    const getData = async () => {
      await getCookieByKey('access_token').then(async (token) => {
        await getCookieByKey('viewdocmockinewdsamothlyioghlia').then(
          async (data) => {
            const docHead = JSON.parse(`${data}`)
            if (docHead.sys_id) {
              setDocumentHead(docHead as Header)
              await GetVoucherItemList({
                accessToken: token as string,
                sisaydi: docHead.sys_id as string,
              }).then((response) => {
                if (response as VoucherItem[]) setVoucherItemList(response)
              })
            }
          }
        )
      })
    }
    getData()
  }, [])
  return (
    <MainLayout>
      <DocHead
        onChange={
          (documentHead) => ''
          // setVoucherItemList((prev) => ({
          //   ...prev,
          //   header: documentHead,
          // }))
        }
        data={fieldList.header as FieldConfig[]}
      />
      <EditableTable
        searchMode
        rows={voucherItemList.map((item, index) => ({
          id: index,
          ...item,
        }))}
        fields={[
          { key: 'VoucherID', label: 'شناسه رسید', type: 'text' },
          { key: 'LedgerRef', label: 'دفتر کل', type: 'text' },
          { key: 'FiscalYearRef', label: 'مرجع سال مالی', type: 'text' },
          { key: 'BranchRef', label: 'مرجع شعبه', type: 'text' },
          { key: 'Number', label: 'شماره', type: 'text' },
          { key: 'Sequence', label: 'توالی', type: 'text' },
          { key: 'DailyNumber', label: 'شماره روزانه', type: 'text' },
          { key: 'AuxiliaryNumber', label: 'شماره کمکی', type: 'text' },
          { key: 'Date', label: 'تاریخ', type: 'text' },
          { key: 'VoucherTypeRef', label: 'مرجع نوع رسید', type: 'text' },
          { key: 'Creator', label: 'ایجادکننده', type: 'text' },
          { key: 'CreationDate', label: 'تاریخ ایجاد', type: 'text' },
          { key: 'LastModifier', label: 'آخرین اصلاح‌کننده', type: 'text' },
          {
            key: 'LastModificationDate',
            label: 'آخرین اصلاح‌کننده',
            type: 'text',
          },
          { key: 'Description', label: 'توضیحات', type: 'text' },
          { key: 'Description_En', label: 'توضیحات_شماره', type: 'text' },
          { key: 'State', label: 'وضعیت', type: 'text' },
          { key: 'IsTemporary', label: 'موقتی', type: 'text' },
          { key: 'IsCurrencyBased', label: 'مبتنی بر ارز', type: 'text' },
          { key: 'IsExternal', label: 'خارجی', type: 'text' },
          { key: 'ReferenceNumber', label: 'شماره مرجع', type: 'text' },
          {
            key: 'ShowCurrencyFields',
            label: 'نمایش فیلدهای ارزی',
            type: 'text',
          },
          { key: 'IsReadonly', label: 'فقط خواندنی', type: 'text' },
          { key: 'Version', label: 'نسخه', type: 'text' },
          { key: 'cust_id', label: 'شناسه مشتری', type: 'text' },
          { key: 'sys_id', label: 'شناسه سیستم', type: 'text' },
          { key: 'sys_status', label: 'وضعیت سیستم', type: 'text' },
          { key: 'sys_st_date_pe_c', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_st_date_pe', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_st_date_en', label: 'تاریخ سیستم', type: 'text' },
          { key: 'sys_type', label: 'sys_type', type: 'text' },
          { key: 'sys_app', label: 'sys_app', type: 'text' },
        ]}
        onRowClick={(row) => {
          //   open(`/accounting/doc`)
          //   setCookieByKey('viewdocmockinewdsamothlyioghlia', `${row.sys_id}`, 1)
        }}
        color={'#2F27CE'}
        className="mt-7 rounded-sm"
      />
    </MainLayout>
  )
}

export default Document
