import { GeneralScheme } from '@/interfaces'

export const GetGenerals = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<GeneralScheme[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_general`,
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

export const InsertGeneral = async ({
  code,
  title,
  title_en,
  accountgroup_ref,
  accessToken,
}: {
  code: string
  title: string
  title_en: string
  accountgroup_ref: number
  accessToken: string
}): Promise<
  | {
      status: string
      gl_id: number
    }
  | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/insert_general`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code, title, title_en, accountgroup_ref }),
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

export const UpdateGeneral = async ({
  code,
  title,
  title_en,
  accountgroup_ref,
  gl_id,
  accessToken,
}: {
  code: string
  title: string
  title_en: string
  accountgroup_ref: number
  gl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/update_general/${gl_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code, title, title_en, accountgroup_ref }),
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

export const DeleteGeneral = async ({
  gl_id,
  accessToken,
}: {
  gl_id: number
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/delete_gl/${gl_id}`,
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
