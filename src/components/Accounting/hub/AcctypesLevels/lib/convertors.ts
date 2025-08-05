import {
  AccountGroupsScheme,
  GeneralScheme,
  SpecificScheme,
} from '@/interfaces'
import { GetGenerals } from '@/services/general'
import { GetAccountGroups } from '@/services/global'
import { GetSpecifics } from '@/services/specific'
import { getCookieByKey } from '@/utils/cookies'

export const convertAccGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const entryData: AccountGroupsScheme[] =
    (await GetAccountGroups({
      accessToken,
    })) || []
  const result =
    entryData.map((row, index) => {
      return {
        id: row.accountgroup_id,
        chpid: 0,
        chtitle: row.accountgroup_title,
        chstatus: row.accountgroup_code,
        chlevel: row.accountgroup_title,
        lev1_count: row.accountgroup_code,
        chlabel: row.accountgroup_title,
      }
    }) || []

  return result
}
export const convertGeneralData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const entryData: GeneralScheme[] =
    (await GetGenerals({
      accessToken,
    })) || []
  const result =
    entryData.map((row, index) => {
      return {
        id: row.accountgroup_id,
        chpid: row.accountgroup_id,
        chtitle: row.gl_title,
        chstatus: row.gl_code,
        chlevel: row.gl_title,
        lev1_count: row.gl_title_en,
        chlabel: row.accountgroup_title,
      }
    }) || []

  return result
}

export const convertSpeceficsData = async (gl_id: number) => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const entryData: SpecificScheme[] =
    (await GetSpecifics({ accessToken, gl_id })) || []

  const result =
    entryData.map((row, index) => {
      return {
        id: row.sl_code,
        chpid: row.sl_id,
        chtitle: row.sl_title,
        chstatus: row.sl_title_en,
        chlevel: row.sl_title,
        lev1_count: row.sl_code,
        chlabel: row.sl_title,
      }
    }) || []

  return result
}

export const convertSpeceficsData = async (gl_id: number) => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const entryData: SpecificScheme[] =
    (await GetSpecifics({ accessToken, gl_id })) || []

  const result =
    entryData.map((row, index) => {
      return {
        id: row.sl_code,
        chpid: row.sl_id,
        chtitle: row.sl_title,
        chstatus: row.sl_title_en,
        chlevel: row.sl_title,
        lev1_count: row.sl_code,
        chlabel: row.sl_title,
      }
    }) || []

  return result
}
