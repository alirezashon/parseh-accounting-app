import { Detail, Header } from '@/interfaces'

export const GetVoucherList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_voucher_list`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if (!response.ok) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const GetVoucherItemList = async ({
  accessToken,
  sisaydi,
}: {
  accessToken: string | undefined
  sisaydi: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_voucheritem_list?sys_id=${sisaydi}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if (!response.ok) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const get_vouchertype = async ({
  accessToken,
}: {
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_vouchertype?SYSType=1`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if (!response.ok) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const InsertEasyVoucher = async ({
  data,
  accessToken,
}: {
  data: { header: Header; details: Detail[] }
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/easyinsert_voucher`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    )

    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.error('InsertDetailType error:', error)
  }
}

export const UpdateVoucher = async ({
  voucher_id,
  details_update,
  header_update,
  accessToken,
}: {
  voucher_id: string
  accessToken: string
  header_update: {
    BranchRef: number
    Date: string
    Number: number
    Sequence: number
    DailyNumber: number
    VoucherTypeRef: number
    Description: string
    Description_En: string
    State: number
    IsTemporary: number
    IsCurrencyBased: number
    IsExternal: number
    ReferenceNumber: number
    ShowCurrencyFields: number
    IsReadonly: number
    FiscalYearRef: number
    Signature: string
  }
  details_update: {
    RowNumber: number
    AccountGroupRef: number
    GLRef: number
    SLRef: number
    SLCode: string
    Debit: number
    Credit: number
    CurrencyRef: number
    Description: string
    Description_En: string
    FollowUpNumber: string
    FollowUpDate: string
    Quantity: number
    DLLevel4: string
    DLLevel5: string
    DLTypeRef4: number
    DLTypeRef5: number
    TaxAccountType: number
    TaxStateType: number
    TransactionType: number
    PurchaseOrSale: number
    ItemOrService: number
    PartyRef: number
    TaxAmount: number
  }[]
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_voucher/${voucher_id}`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ header_update, details_update }),
      }
    )

    if (response.status !== 200) {
      return
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const DeleteVoucher = async ({
  voucher_id,
  accessToken,
}: {
  voucher_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/delete_voucher/${voucher_id}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (response.status !== 200) {
      return
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
