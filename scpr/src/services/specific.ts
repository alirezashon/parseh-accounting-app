import { SpecificScheme } from '@/interfaces'

export const GetSpecifics = async ({
  accessToken,
  gl_id,
}: {
  accessToken: string | undefined
  gl_id: number
}): Promise<SpecificScheme[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_specific?gl_id=${gl_id}`,
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

export const InsertSpecific = async ({
  code,
  title,
  title_en,
  gl_ref,
  accessToken,
}: {
  code: string
  title: string
  title_en: string
  gl_ref: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/insert_specific`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code, title, title_en, gl_ref }),
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

export const UpdateSpecific = async ({
  code,
  title,
  title_en,
  gl_ref,
  sl_id,
  accessToken,
}: {
  code: string
  title: string
  title_en: string
  gl_ref: number
  sl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_specific/${sl_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code, title, title_en, gl_ref, sl_id }),
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

export const DeleteSpecific = async ({
  sl_id,
  accessToken,
}: {
  sl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/delete_sl/${sl_id}`,
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
