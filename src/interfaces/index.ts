export interface AccountGroupsScheme {
  accountgroup_id: number
  accountgroup_code: string
  accountgroup_title: string
}
export interface GeneralScheme {
  gl_id: number
  gl_code: string
  gl_title: string
  gl_title_en: string
  accountgroup_id: number
  accountgroup_code: string
  accountgroup_title: string
}
export interface SpecificScheme {
  sl_id: number
  sl_code: string
  sl_title: string
  sl_title_en: string
}
export interface DetailTypeScheme {
  DLTypeID: number
  Title: string
}
export interface DetailedScheme {
  dl_id: number
  dl_code: string
  dl_title: string
  dl_title_en: string
  dltype_id: number
  dltype_title: string
}

export interface IUserResponse {
  customer_status: string
  mobile: string
  first_name: string
  last_name: string
  full_name: string
  customer_code: string
  role: string
  approve_status: number
  uid: number
  user_approve: number
  customer_approve: number
  user_status: string
  user_role_id: number
  role_count: number
}

export interface VoucherTypeScheme {
  VoucherTypeID: number
  Code: number
  Title: string
  Title_En: string
  Description: string
}
export interface Header {
  BranchRef: number
  Date: string
  VoucherTypeRef: number
  IsCurrencyBased: number
  Description: string
  Description_En: string
  State: number
  IsTemporary: number
  IsExternal: number
  ReferenceNumber: number
  ShowCurrencyFields: number
  IsReadonly: number
  FiscalYearRef: number
  Signature: string
}

export interface Detail {
  RowNumber: number
  AccountGroupRef: number
  GLRef: number
  SLRef: number
  SLCode: string
  Debit: number
  Credit: number
  Description: string
  Description_En: string
  FollowUpNumber: string
  FollowUpDate: string
  Quantity: number
  DLLevel4: string
  DLLevel5: string
  DLTypeRef4: number
  DLTypeRef5: number
  CurrencyRef: number
  TaxAccountType: number
  TaxStateType: number
  TransactionType: number
  PurchaseOrSale: number
  ItemOrService: number
  PartyRef: number
  TaxAmount: number
}
