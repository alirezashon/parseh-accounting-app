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


// types.ts
export interface SL {
  SLID: number;
  Code: string;
  Title: string;
  Title_En: string | null;
  Nature: number | null;
  IsTraceable: boolean | null;
  IsMultiCurrency: boolean | null;
  HasCurrencyConversion: boolean | null;
  State: number | null;
  Type: number | null;
  DLTypes: unknown[]; // اگر نوع دقیق دارید، این را دقیق‌تر کنید
}




export interface GL {
  GLID: number;
  Code: string;
  Title: string;
  Title_En: string | null;
  Nature: number | null;
  Type: number | null;
  State: number | null;
  SLs: SL[];
}

export interface AccountGroup {
  AccountGroupID: number;
  Code: string;
  Title: string;
  Title_En: string | null;
  State: number | null;
  Nature: number | null;
  Type: number | null;
  GLs: GL[];
}

// ریشه‌ی داده:
export type ChartOfAccounts = AccountGroup[];


export const GetAllTreeData = async ({
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


