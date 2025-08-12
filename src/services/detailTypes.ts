import { DetailTypeScheme } from '@/interfaces'

export const GetDetailTypes = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<DetailTypeScheme[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_detail_type`,
      {
        method: 'GET',
        headers: {
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

export const InsertDetailType = async ({
  title,
  status = 1,
  accessToken,
}: {
  title: string
  status?: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/insert_detail_type`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, status }),
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
  title: string
  status: number
  dltype_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_detail_type/${dltype_id}`,
      {
        method: 'PUT',
        headers: {
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
