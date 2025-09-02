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
  Number: number
  Sequence: number
  DailyNumber: number
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
export interface VoucherList {
  VoucherID: number
  LedgerRef: number
  FiscalYearRef: number
  BranchRef: number
  Number: number
  Sequence: number
  DailyNumber: number
  AuxiliaryNumber: string
  Date: string
  VoucherTypeRef: number
  Creator: number
  CreationDate: string
  LastModifier: number
  LastModificationDate: string
  Description: string
  Description_En: string
  State: number
  IsTemporary: number
  IsCurrencyBased: number
  IsExternal: number
  ReferenceNumber: number
  ShowCurrencyFields: number
  IsReadonly: number
  Version: null
  cust_id: number
  sys_id: string
  sys_status: number
  sys_st_date_pe_c: string
  sys_st_date_pe: string
  sys_st_date_en: string
  sys_type: number
  sys_app: number
}
export interface VoucherItem {
  VoucherItemID: number
  VoucherRef: number
  BranchRef: number
  RowNumber: number
  AccountGroupRef: number
  GLRef: number
  SLRef: number
  SLCode: string
  Debit: number
  Credit: number
  CurrencyRef: number
  BaseCurrencyRef: number
  TargetCurrencyRef: number
  TargetCurrencyDebit: number
  TargetCurrencyCredit: number
  IsCurrencyBased: number
  OperationalCurrencyExchangeRateRef: number
  OperationalCurrencyExchangeRate: number
  BaseCurrencyExchangeRateRef: number
  BaseCurrencyExchangeRate: number
  CurrencyDebit: number
  CurrencyCredit: number
  Description: string
  Description_En: string
  FollowUpNumber: string
  FollowUpDate: string
  Quantity: number
  DLLevel4: string
  DLLevel5: string
  DLLevel6: string
  DLLevel7: string
  DLLevel8: string
  DLLevel9: string
  DLLevel10: string
  DLLevel11: string
  DLLevel12: string
  DLLevel13: string
  DLLevel14: string
  DLLevel15: string
  DLLevel16: string
  DLLevel17: string
  DLLevel18: string
  DLLevel19: string
  DLLevel20: string
  DLTypeRef4: number
  DLTypeRef5: number
  DLTypeRef6: string
  DLTypeRef7: string
  DLTypeRef8: string
  DLTypeRef9: string
  DLTypeRef10: string
  DLTypeRef11: string
  DLTypeRef12: string
  DLTypeRef13: string
  DLTypeRef14: string
  DLTypeRef15: string
  DLTypeRef16: string
  DLTypeRef17: string
  DLTypeRef18: string
  DLTypeRef19: string
  DLTypeRef20: string
  TaxAccountType: number
  TaxStateType: number
  TransactionType: number
  PurchaseOrSale: number
  ItemOrService: number
  PartyRef: number
  TaxAmount: number
  TollAmount: number
  Version: string
  PeriodNature: number
  IsTaxPrepaymentUnrefundable: number
  IsTollPrepaymentUnrefundable: number
  sys_pid: string
  sys_app: number
  receiver_delivery: string
}