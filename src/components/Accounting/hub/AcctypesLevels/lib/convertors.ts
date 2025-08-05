import {
  AccountGroupsScheme,
  DetailedScheme,
  DetailTypeScheme,
  GeneralScheme,
  SpecificScheme,
} from '@/interfaces'
import { GetDetailed } from '@/services/detailed'
import { GetDetailTypes } from '@/services/detailTypes'
import { GetGenerals } from '@/services/general'
import { GetAccountGroups } from '@/services/global'
import { GetSpecifics } from '@/services/specific'
import { getCookieByKey } from '@/utils/cookies'
import { TreeChartInterface } from '..'

export const getAllTreeData = async (): Promise<TreeChartInterface[]> => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const finalTree: TreeChartInterface[] = []
 
  const accGroups: AccountGroupsScheme[] =
    (await GetAccountGroups({ accessToken })) || []
  accGroups.forEach((row) => {
    finalTree.push({
      id: row.accountgroup_id,
      chpid: 0,
      chtitle: row.accountgroup_title,
      chstatus: row.accountgroup_id,
      chlevel: 0,
      lev1_count: row.accountgroup_id,
      chlabel: row.accountgroup_title,
    })
  })
 
  const generals: GeneralScheme[] = (await GetGenerals({ accessToken })) || []
  generals.forEach((row) => {
    finalTree.push({
      id: row.gl_id,
      chpid: row.accountgroup_id,
      chtitle: row.gl_title,
      chstatus: row.gl_id,
      chlevel: 1,
      lev1_count: row.gl_id,
      chlabel: row.accountgroup_title,
    })
  })

  // --- سطح 2: Specifics
  for (const gl of generals) {
    const specifics: SpecificScheme[] =
      (await GetSpecifics({ accessToken, gl_id: gl.gl_id })) || []
    specifics.forEach((row) => {
      finalTree.push({
        id: row.sl_id,
        chpid: gl.gl_id,
        chtitle: row.sl_title,
        chstatus: row.sl_id,
        chlevel: 2,
        lev1_count: row.sl_id,
        chlabel: row.sl_title,
      })
    })
  }

  // --- سطح 3: Detail Types
  const detailTypes: DetailTypeScheme[] =
    (await GetDetailTypes({ accessToken })) || []
  detailTypes.forEach((row) => {
    finalTree.push({
      id: row.DLTypeID,
      chpid: 0, // یا اگه والد داری از اون استفاده کن
      chtitle: row.Title,
      chstatus: row.DLTypeID,
      chlevel: 3,
      lev1_count: row.DLTypeID,
      chlabel: row.Title,
    })
  })

  // --- سطح 4: Detailed
  for (const dt of detailTypes) {
    const detailed: DetailedScheme[] =
      (await GetDetailed({ accessToken, DLTypeID: dt.DLTypeID })) || []
    detailed.forEach((row) => {
      finalTree.push({
        id: row.dl_id,
        chpid: dt.DLTypeID,
        chtitle: row.dl_title,
        chstatus: row.dl_id,
        chlevel: 4,
        lev1_count: row.dl_id,
        chlabel: row.dl_title,
      })
    })
  }

  return finalTree
}
