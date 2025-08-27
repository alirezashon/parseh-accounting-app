import { AccountGroupsScheme } from '@/interfaces'

export const GetAccountGroups = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<AccountGroupsScheme[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_accountgroup`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 12712,
          tags: ['get_accountgroup'],
        },
      }
    )
    if (!response.ok) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export interface SL {
  SLID: number
  Code: string
  Title: string
  Title_En: string | null
  Nature: number | null
  IsTraceable: boolean | null
  IsMultiCurrency: boolean | null
  HasCurrencyConversion: boolean | null
  State: number | null
  Type: number | null
  DLTypes: unknown[]
}

export interface GL {
  GLID: number
  Code: string
  Title: string
  Title_En: string | null
  Nature: number | null
  Type: number | null
  State: number | null
  SLs: SL[]
}

export interface TreeInterface {
  AccountGroupID: number
  Code: string
  Title: string
  Title_En: string | null
  State: number | null
  Nature: number | null
  Type: number | null
  GLs: GL[]
}

export const GetAllTreeData = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<TreeInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_account_hierarchy?state=1`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
        next: {
          revalidate: 12712,
          tags: ['get_accountgroup'],
        },
      }
    )
    if (!response.ok) return
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
