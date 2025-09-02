import { GetAllTreeData } from '@/services/global'
import { getCookieByKey } from '@/utils/cookies'
import { TreeChartInterface } from './data'
import { GetDetailed } from '@/services/detailed'
import { DetailedScheme } from '@/interfaces'

let treeCache: TreeChartInterface[] | null = null

export const getAllTreeData = async (): Promise<TreeChartInterface[]> => {
  if (treeCache) return treeCache

  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = (await GetAllTreeData({ accessToken })) || []
  const finalTree: TreeChartInterface[] = []

  response.forEach((accGroup) => {
    finalTree.push({
      id: accGroup.AccountGroupID,
      chpid: 0,
      chtitle: accGroup.Title,
      chstatus: accGroup.State || 1,
      chlevel: 0,
      lev1_count: accGroup.AccountGroupID,
      chlabel: accGroup.Title,
    })

    accGroup.GLs.forEach((gl) => {
      finalTree.push({
        id: gl.GLID,
        chpid: accGroup.AccountGroupID,
        chtitle: gl.Title,
        chstatus: gl.State || 1,
        chlevel: 1,
        lev1_count: gl.GLID,
        chlabel: gl.Title,
      })

      gl.SLs?.forEach((sl) => {
        finalTree.push({
          id: sl.SLID,
          chpid: gl.GLID,
          chtitle: sl.Title,
          chstatus: sl.State || 1,
          chlevel: 2,
          lev1_count: sl.SLID,
          chlabel: sl.Title,
        })
        sl.DLTypes.forEach((dl) => {
          finalTree.push({
            id: dl.DLTypeID,
            chpid: dl.DLTypeID,
            chtitle: dl.Title,
            chstatus: sl.State || 1,
            chlevel: 2,
            lev1_count: sl.SLID,
            chlabel: sl.Title,
          })
        })
      })
    })
  })

  treeCache = finalTree
  return finalTree
}

export const getSelectreeData = async ({
  dlType,
}: {
  dlType?: number
}): Promise<DetailedScheme[]> => {
  const accessToken = getCookieByKey('access_token') || ''
  const response = await GetDetailed({ accessToken, DLTypeID: dlType || 0 })

  if (response && Array.isArray(response)) {
    return response
  }

  // ← در غیر اینصورت یک آرایه خالی برگردون، نه undefined
  return []
}
