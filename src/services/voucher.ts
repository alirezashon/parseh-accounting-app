import { EasyInsertVoucherScheme } from '@/interfaces'

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
  data: EasyInsertVoucherScheme
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
        body: JSON.stringify({ header: data.types[0], details: data.types[1] }),
      }
    )

    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.error('InsertDetailType error:', error)
  }
}

export const UpdateDetailTypes = async ({
  dltype_id,
  title,
  status,
  accessToken,
}: {
  code: string
  title: string
  status: number
  dltype_id: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_detail_type/${dltype_id}`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status, title }),
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

export const DeleteDetailType = async ({
  dltype_id,
  accessToken,
}: {
  dltype_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/delete_dltype/${dltype_id}`,
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
