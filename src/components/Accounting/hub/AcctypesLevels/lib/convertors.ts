
import { GetAllTreeData } from '@/services/global'
import { getCookieByKey } from '@/utils/cookies'
import { TreeChartInterface } from './data'

let treeCache: TreeChartInterface[] | null = null

export const getAllTreeData = async (): Promise<TreeChartInterface[]> => {
  if (treeCache) return treeCache

  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = (await GetAllTreeData({ accessToken })) || []
  const finalTree: TreeChartInterface[] = []

  response.forEach((accGroup) => {
    // سطح 0: AccountGroup
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
      // سطح 1: GL
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
        // سطح 2: SL
        finalTree.push({
          id: sl.SLID,
          chpid: gl.GLID,
          chtitle: sl.Title,
          chstatus: sl.State || 1,
          chlevel: 2,
          lev1_count: sl.SLID,
          chlabel: sl.Title,
        })
      })
    })
  })

  treeCache = finalTree
  return finalTree
}
