'use client'
import { getCookieByKey } from '@/actions/cookieToken'
import { VoucherItem, VoucherList } from '@/interfaces'
import MainLayout from '@/layouts/Main'
import { GetVoucherItemList, UpdateVoucher } from '@/services/voucher'
import { useEffect, useState } from 'react'
import EditableTable from '../hub/DetailedBlankTable'
import { FieldConfig, fieldList } from '../AddDocument/lib/data'
import DocHead from './lib/FormHead'

const Document = () => {
  const [voucherItemList, setVoucherItemList] = useState<VoucherItem[]>([])
  const [documentHead, setDocumentHead] = useState<VoucherList>()

  const getData = async () => {
    const token = await getCookieByKey('access_token')
    const data = await getCookieByKey('viewdocmockinewdsamothlyioghlia')

    if (data) {
      const result: VoucherList = JSON.parse(data)

      if (result?.sys_id) {
        setDocumentHead(result)
        const response = await GetVoucherItemList({
          accessToken: token as string,
          sisaydi: result.sys_id as string,
        })

        if (response && Array.isArray(response)) {
          setVoucherItemList(response as VoucherItem[])
        }
      }
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const onSubmit = async () => {
    if (!documentHead) return
    const accessToken = (await getCookieByKey('access_token')) || ''

    await UpdateVoucher({
      voucher_id: documentHead.VoucherID,
      accessToken,
      header_update: {
        BranchRef: documentHead.BranchRef,
        Date: documentHead.Date,
        Number: documentHead.Number,
        Sequence: documentHead.Sequence,
        DailyNumber: documentHead.DailyNumber,
        VoucherTypeRef: documentHead.VoucherTypeRef,
        Description: documentHead.Description,
        Description_En: documentHead.Description_En,
        State: documentHead.State,
        IsTemporary: documentHead.IsTemporary,
        IsCurrencyBased: documentHead.IsCurrencyBased,
        IsExternal: documentHead.IsExternal,
        ReferenceNumber: documentHead.ReferenceNumber,
        ShowCurrencyFields: documentHead.ShowCurrencyFields,
        IsReadonly: documentHead.IsReadonly,
        FiscalYearRef: documentHead.FiscalYearRef,
        Signature: '', // اگر لازم نیست می‌تونی حذفش
      },
      
      details_update: voucherItemList.map((item) => ({
        RowNumber: item.RowNumber,
        AccountGroupRef: item.AccountGroupRef,
        GLRef: item.GLRef,
        SLRef: item.SLRef,
        SLCode: item.SLCode,
        Debit: item.Debit,
        Credit: item.Credit,
        CurrencyRef: item.CurrencyRef,
        Description: item.Description,
        Description_En: item.Description_En,
        FollowUpNumber: item.FollowUpNumber,
        FollowUpDate: item.FollowUpDate || '',
        Quantity: item.Quantity,
        DLLevel4: item.DLLevel4,
        DLLevel5: item.DLLevel5,
        DLTypeRef4: item.DLTypeRef4,
        DLTypeRef5: item.DLTypeRef5,
        TaxAccountType: item.TaxAccountType,
        TaxStateType: item.TaxStateType,
        TransactionType: item.TransactionType,
        PurchaseOrSale: item.PurchaseOrSale,
        ItemOrService: item.ItemOrService,
        PartyRef: item.PartyRef,
        TaxAmount: item.TaxAmount,
      })),
    })
  }

  return (
    <MainLayout>
      <DocHead
        value={documentHead as VoucherList}
        onChange={(documentHead: VoucherList) => setDocumentHead(documentHead)}
        data={fieldList.header as FieldConfig[]}
      />
      <EditableTable
        setRows={(data) =>
          setVoucherItemList(
            data.map((row) => {
              const { id, ...rest } = row
              return rest as VoucherItem
            })
          )
        }
        searchMode
        rows={
          Array.isArray(voucherItemList)
            ? voucherItemList.map((item, index) => ({
                id: index,
                ...item,
              }))
            : []
        }
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
      <div
        onClick={onSubmit}
        className="flex z-20 justify-center sticky bottom-1 items-center gap-2 rounded-lg px-2 py-2 text-sm bg-indigo-600 text-white hover:bg-[#2F27CE] active:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        ثبت سند
      </div>
    </MainLayout>
  )
}

export default Document
