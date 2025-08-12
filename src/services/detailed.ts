import { DetailedScheme } from '@/interfaces'

export const GetDetailed = async ({
  accessToken,
  DLTypeID,
}: {
  accessToken: string | undefined
  DLTypeID: number
}): Promise<DetailedScheme[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_detailed?DLTypeID=${DLTypeID}`,
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

export const InsertDetailed = async ({
  title,
  code,
  dltype_ref,
  title_en,
  accessToken,
}: {
  title: string
  accessToken: string
  code: string
  title_en: string
  dltype_ref: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/insert_detailed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, code, dltype_ref, title_en }),
      }
    )

    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.error('InsertDetailed error:', error)
  }
}

export const UpdateDetailed = async ({
  dl_id,
  title,
  code,
  dltype_ref,
  title_en,
  accessToken,
}: {
  title_en: string
  dltype_ref: number
  code: string
  title: string
  dl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_detailed/${dl_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code, dltype_ref, title_en, title }),
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

export const DeleteDetailed = async ({
  dl_id,
  accessToken,
}: {
  dl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/delete_dl/${dl_id}`,
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
