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
