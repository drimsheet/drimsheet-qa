/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export const EPeriodUnit = {
  Day: "day",
  Week: "week",
  Month: "month",
  Quarter: "quarter",
  Year: "year",
} as const;
export type UPeriodUnit = (typeof EPeriodUnit)[keyof typeof EPeriodUnit];

export const EAccountingStandardCode = {
  AASB: "AASB",
  ASPE: "ASPE",
  CAS: "CAS",
  CGNC: "CGNC",
  EAS: "EAS",
  HGB: "HGB",
  HKFRS: "HKFRS",
  IFRS: "IFRS",
  IND_AS: "IND_AS",
  ISRAELI_GAAP: "ISRAELI_GAAP",
  J_GAAP: "J_GAAP",
  K_IFRS: "K_IFRS",
  MFRS: "MFRS",
  NIF: "NIF",
  NZ_IFRS: "NZ_IFRS",
  OIC: "OIC",
  PCG: "PCG",
  PFRS: "PFRS",
  PGC: "PGC",
  PSAK: "PSAK",
  RAS: "RAS",
  RJ: "RJ",
  SCF: "SCF",
  SFRS: "SFRS",
  SWISS_GAAP_FER: "SWISS_GAAP_FER",
  SYSCOHADA: "SYSCOHADA",
  TFRS: "TFRS",
  THAI_FRS: "THAI_FRS",
  TIFRS: "TIFRS",
  UK_GAAP: "UK_GAAP",
  US_GAAP: "US_GAAP",
  VAS: "VAS",
  LOCAL_GAAP: "LOCAL_GAAP",
  CASH_BASIS: "CASH_BASIS",
} as const;
export type UAccountingStandardCode = (typeof EAccountingStandardCode)[keyof typeof EAccountingStandardCode];

export const EJurisdictionCode = {
  AD: "AD",
  AE: "AE",
  AR: "AR",
  AT: "AT",
  AU: "AU",
  BD: "BD",
  BE: "BE",
  BR: "BR",
  CA: "CA",
  CH: "CH",
  CI: "CI",
  CL: "CL",
  CM: "CM",
  CN: "CN",
  CO: "CO",
  CY: "CY",
  CZ: "CZ",
  DE: "DE",
  DK: "DK",
  DZ: "DZ",
  EE: "EE",
  EG: "EG",
  ES: "ES",
  FI: "FI",
  FR: "FR",
  GB: "GB",
  GH: "GH",
  GR: "GR",
  HK: "HK",
  HR: "HR",
  HU: "HU",
  ID: "ID",
  IE: "IE",
  IL: "IL",
  IN: "IN",
  IT: "IT",
  JP: "JP",
  KE: "KE",
  KR: "KR",
  LT: "LT",
  LU: "LU",
  LV: "LV",
  MA: "MA",
  MC: "MC",
  MT: "MT",
  MX: "MX",
  MY: "MY",
  NG: "NG",
  NL: "NL",
  NO: "NO",
  NZ: "NZ",
  PE: "PE",
  PH: "PH",
  PK: "PK",
  PL: "PL",
  PT: "PT",
  RO: "RO",
  RU: "RU",
  SA: "SA",
  SE: "SE",
  SG: "SG",
  SI: "SI",
  SK: "SK",
  SM: "SM",
  SN: "SN",
  TH: "TH",
  TR: "TR",
  TW: "TW",
  TZ: "TZ",
  UA: "UA",
  UG: "UG",
  US: "US",
  VA: "VA",
  VN: "VN",
  ZA: "ZA",
} as const;
export type UJurisdictionCode = (typeof EJurisdictionCode)[keyof typeof EJurisdictionCode];

export const ECurrencyCode = {
  AED: "AED",
  ARS: "ARS",
  AUD: "AUD",
  BDT: "BDT",
  BRL: "BRL",
  CAD: "CAD",
  CHF: "CHF",
  CLP: "CLP",
  CNY: "CNY",
  COP: "COP",
  CZK: "CZK",
  DKK: "DKK",
  DZD: "DZD",
  EGP: "EGP",
  EUR: "EUR",
  GBP: "GBP",
  GHS: "GHS",
  HKD: "HKD",
  HUF: "HUF",
  IDR: "IDR",
  ILS: "ILS",
  INR: "INR",
  JPY: "JPY",
  KES: "KES",
  KRW: "KRW",
  MAD: "MAD",
  MXN: "MXN",
  MYR: "MYR",
  NGN: "NGN",
  NOK: "NOK",
  NZD: "NZD",
  PEN: "PEN",
  PHP: "PHP",
  PKR: "PKR",
  PLN: "PLN",
  RON: "RON",
  RUB: "RUB",
  SAR: "SAR",
  SEK: "SEK",
  SGD: "SGD",
  THB: "THB",
  TRY: "TRY",
  TWD: "TWD",
  TZS: "TZS",
  UAH: "UAH",
  UGX: "UGX",
  USD: "USD",
  VND: "VND",
  XAF: "XAF",
  XOF: "XOF",
  ZAR: "ZAR",
} as const;
export type UCurrencyCode = (typeof ECurrencyCode)[keyof typeof ECurrencyCode];

export const EAccountingEntityType = {
  Individual: "individual",
  SoleTrader: "sole_trader",
  PrivateCompany: "private_company",
} as const;
export type UAccountingEntityType = (typeof EAccountingEntityType)[keyof typeof EAccountingEntityType];

export const ECounterpartySortBy = {
  CreatedAt: "createdAt",
  Name: "name",
} as const;
export type UCounterpartySortBy = (typeof ECounterpartySortBy)[keyof typeof ECounterpartySortBy];

export const ECounterpartyRole = {
  Employer: "employer",
  Vendor: "vendor",
  Contractor: "contractor",
} as const;
export type UCounterpartyRole = (typeof ECounterpartyRole)[keyof typeof ECounterpartyRole];

export const ECounterpartyStatus = {
  Active: "active",
  Archived: "archived",
} as const;
export type UCounterpartyStatus = (typeof ECounterpartyStatus)[keyof typeof ECounterpartyStatus];

export const ECounterpartyType = {
  Individual: "individual",
  Organization: "organization",
} as const;
export type UCounterpartyType = (typeof ECounterpartyType)[keyof typeof ECounterpartyType];

export const EJournalSide = {
  Debit: "debit",
  Credit: "credit",
} as const;
export type UJournalSide = (typeof EJournalSide)[keyof typeof EJournalSide];

export const EJournalEntryStatus = {
  Archived: "archived",
  Draft: "draft",
  Posted: "posted",
  Voided: "voided",
} as const;
export type UJournalEntryStatus = (typeof EJournalEntryStatus)[keyof typeof EJournalEntryStatus];

export const ELedgerAccountBalanceEffect = {
  Increase: "increase",
  Decrease: "decrease",
  Noop: "noop",
} as const;
export type ULedgerAccountBalanceEffect = (typeof ELedgerAccountBalanceEffect)[keyof typeof ELedgerAccountBalanceEffect];

export const EExchangeRateType = {
  Official: "official",
  Negotiated: "negotiated",
  Market: "market",
} as const;
export type UExchangeRateType = (typeof EExchangeRateType)[keyof typeof EExchangeRateType];

export const EJournalEntrySourceType = {
  System: "system",
  Expense: "expense",
  OpeningBalance: "opening_balance",
  Sale: "sale",
  Purchase: "purchase",
  CreditNote: "credit_note",
  DebitNote: "debit_note",
  Transfer: "transfer",
  Payment: "payment",
  Receipt: "receipt",
  Adjustment: "adjustment",
} as const;
export type UJournalEntrySourceType = (typeof EJournalEntrySourceType)[keyof typeof EJournalEntrySourceType];

export const EPaginationSortDirection = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type UPaginationSortDirection = (typeof EPaginationSortDirection)[keyof typeof EPaginationSortDirection];

export const ELedgerAccountSortBy = {
  AccountName: "accountName",
  CreatedAt: "createdAt",
  Balance: "balance",
} as const;
export type ULedgerAccountSortBy = (typeof ELedgerAccountSortBy)[keyof typeof ELedgerAccountSortBy];

export const ELedgerAccountSubType = {
  RetainedEarnings: "retained_earnings",
  Sales: "sales",
  Services: "services",
  Subscriptions: "subscriptions",
  EmploymentIncome: "employment_income",
  InterestIncome: "interest_income",
  GainOnAssetSale: "gain_on_asset_sale",
  UnrealizedGains: "unrealized_gains",
  Grants: "grants",
  Gifts: "gifts",
  PayrollAndPersonnel: "payroll_and_personnel",
  RentAndUtilities: "rent_and_utilities",
  AdminAndGeneral: "admin_and_general",
  MarketingAndSelling: "marketing_and_selling",
  ResearchAndDevelopment: "research_and_development",
  DepreciationAndAmortization: "depreciation_and_amortization",
  BankCharge: "bank_charge",
  FinanceCost: "finance_cost",
  Interest: "interest",
  UnrealizedLoss: "unrealized_loss",
  ImpairmentLoss: "impairment_loss",
  OtherLoss: "other_loss",
  CashAndCashEquivalent: "cash_and_cash_equivalent",
  ShortTermInvestment: "short_term_investment",
  Receivables: "receivables",
  Inventory: "inventory",
  AccruedIncome: "accrued_income",
  Prepayments: "prepayments",
  LongTermInvestment: "long_term_investment",
  PropertyPlantAndEquipment: "property_plant_and_equipment",
  IntangibleAssets: "intangible_assets",
  RightOfUseAssets: "right_of_use_assets",
  Goodwill: "goodwill",
  Suspense: "suspense",
  ShortTermDebt: "short_term_debt",
  Payable: "payable",
  AccruedExpense: "accrued_expense",
  DeferredRevenue: "deferred_revenue",
  LongTermLoan: "long_term_loan",
  LeaseLiability: "lease_liability",
  Provision: "provision",
  Capital: "capital",
  Reserve: "reserve",
  OpeningBalance: "opening_balance",
  DirectCosts: "direct_costs",
  IncomeTaxExpense: "income_tax_expense",
  LossOnAssetDisposal: "loss_on_asset_disposal",
} as const;
export type ULedgerAccountSubType = (typeof ELedgerAccountSubType)[keyof typeof ELedgerAccountSubType];

export const EAdjunctAccountRule = {
  AdjunctPermitted: "adjunct_permitted",
  AdjunctNotPermitted: "adjunct_not_permitted",
  AdjunctOnly: "adjunct_only",
  AdjunctNotApplicable: "adjunct_not_applicable",
} as const;
export type UAdjunctAccountRule = (typeof EAdjunctAccountRule)[keyof typeof EAdjunctAccountRule];

export const EContraAccountRule = {
  ContraPermitted: "contra_permitted",
  ContraNotPermitted: "contra_not_permitted",
  ContraOnly: "contra_only",
  ContraNotApplicable: "contra_not_applicable",
} as const;
export type UContraAccountRule = (typeof EContraAccountRule)[keyof typeof EContraAccountRule];

export const ELedgerAccountStatus = {
  Active: "active",
  Archived: "archived",
} as const;
export type ULedgerAccountStatus = (typeof ELedgerAccountStatus)[keyof typeof ELedgerAccountStatus];

export const ELedgerAccountBehavior = {
  Bank: "bank",
  PettyCash: "petty_cash",
  DefaultCash: "default_cash",
  StockAndEtfs: "stock_and_etfs",
  Bonds: "bonds",
  StatutoryReceivable: "statutory_receivable",
  TradeReceivable: "trade_receivable",
  DefaultReceivables: "default_receivables",
  Default: "default",
  CreditCard: "credit_card",
  Overdraft: "overdraft",
  ShortTermLoan: "short_term_loan",
  DefaultShortTermDebt: "default_short_term_debt",
  TaxPayable: "tax_payable",
  TradePayable: "trade_payable",
  DefaultPayable: "default_payable",
  Mortgage: "mortgage",
  OtherLongTermLoan: "other_long_term_loan",
  OwnerCapital: "owner_capital",
  RetainedEarnings: "retained_earnings",
  RevaluationReserve: "revaluation_reserve",
  OpeningBalanceEquity: "opening_balance_equity",
  Sales: "sales",
  Services: "services",
  Subscriptions: "subscriptions",
  EmploymentIncome: "employment_income",
  InterestIncome: "interest_income",
  GainOnAssetSale: "gain_on_asset_sale",
  UnrealizedGains: "unrealized_gains",
  Grants: "grants",
  Gifts: "gifts",
  Cogs: "cogs",
  CostOfServices: "cost_of_services",
  CostOfRevenue: "cost_of_revenue",
  DefaultDirectCost: "default_direct_cost",
  PayrollAndPersonnel: "payroll_and_personnel",
  RentAndUtilities: "rent_and_utilities",
  AdminAndGeneral: "admin_and_general",
  MarketingAndSelling: "marketing_and_selling",
  ResearchAndDevelopment: "research_and_development",
  DepreciationAndAmortization: "depreciation_and_amortization",
  BankCharge: "bank_charge",
  FinanceCost: "finance_cost",
  Interest: "interest",
  TaxExpense: "tax_expense",
  UnrealizedLoss: "unrealized_loss",
  AssetDisposalLoss: "asset_disposal_loss",
  ImpairmentLoss: "impairment_loss",
  OtherLoss: "other_loss",
} as const;
export type ULedgerAccountBehavior = (typeof ELedgerAccountBehavior)[keyof typeof ELedgerAccountBehavior];

export const ENormalBalance = {
  Debit: "debit",
  Credit: "credit",
} as const;
export type UNormalBalance = (typeof ENormalBalance)[keyof typeof ENormalBalance];

export const ELedgerType = {
  Asset: "asset",
  Liability: "liability",
  Revenue: "revenue",
  Expense: "expense",
  Equity: "equity",
} as const;
export type ULedgerType = (typeof ELedgerType)[keyof typeof ELedgerType];

export const EAppUsageModePreference = {
  PowerUser: "power_user",
  NonPowerUser: "non_power_user",
} as const;
export type UAppUsageModePreference = (typeof EAppUsageModePreference)[keyof typeof EAppUsageModePreference];

export const EAppThemePreference = {
  Light: "light",
  Dark: "dark",
  System: "system",
} as const;
export type UAppThemePreference = (typeof EAppThemePreference)[keyof typeof EAppThemePreference];

export type TEntityId = string & {
  __brand: "uuid";
};

export interface IUserAppPreferences {
  theme?: UAppThemePreference;
  appUsageMode: UAppUsageModePreference;
}

export interface IUserPreferences {
  userId: TEntityId;
  lastActiveAccountingEntityId: TEntityId | null;
  appPreferences: IUserAppPreferences;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface IApiValidationError {
  field: string;
  message: string;
}

/** Construct a type with a set of properties K of type T */
export type RecordStringUnknown = Record<string, any>;

export type TErrorCause = RecordStringUnknown;

export interface IHttpErrorDto {
  name: string;
  errorKey: string;
  validationErrors?: IApiValidationError[];
  cause?: TErrorCause;
}

export interface IUserPreferencesUpdateDto {
  theme?: UAppThemePreference;
  appUsageMode?: UAppUsageModePreference;
}

export interface IUserProfileDto {
  id: TEntityId;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

/** Construct a type with a set of properties K of type T */
export type RecordStringString = Record<string, string>;

export interface IMoneyDto {
  /** @format double */
  amount: number;
  currencyCode: string;
  isMinorUnit: boolean;
}

export interface ILedgerAccountDto {
  id: TEntityId;
  code: string;
  materializedPath: string;
  accountingEntityId: TEntityId;
  type: ULedgerType;
  normalBalance: UNormalBalance;
  subType: any;
  behavior: ULedgerAccountBehavior;
  isControlAccount: boolean;
  controlAccountId?: TEntityId;
  name: string;
  status: ULedgerAccountStatus;
  contraAccountRule: UContraAccountRule;
  adjunctAccountRule: UAdjunctAccountRule;
  /** Construct a type with a set of properties K of type T */
  meta?: RecordStringString;
  /** @format date-time */
  openingBalanceDate: string | null;
  createdBy: TEntityId;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  balance: IMoneyDto;
  functionalBalance: IMoneyDto;
}

export interface IPaginationResponseMeta {
  /** @format double */
  page: number;
  /** @format double */
  limit: number;
  /** @format double */
  total: number;
  /** @format double */
  totalPages: number;
}

export interface IPaginatedResponseILedgerAccountDto {
  data: ILedgerAccountDto[];
  meta: IPaginationResponseMeta;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickIPaginationParamsExcludeKeysOffset {
  /** @format double */
  limit?: number;
  orderBy?: string;
  sortDirection?: UPaginationSortDirection;
  search?: string;
}

export interface IGetLedgerAccountsQuery {
  /** @format double */
  limit?: number;
  orderBy?: ULedgerAccountSortBy;
  sortDirection?: UPaginationSortDirection;
  search?: string;
  /** @format double */
  page?: number;
  type?: ULedgerType;
  subType?: ULedgerAccountSubType;
  behavior?: string;
  isControlAccount?: boolean;
}

export interface IGetPermittedPostingAccountsQuery {
  sourceType: UJournalEntrySourceType;
  side: "source" | "destination";
  currencyCode?: string;
  /** @format double */
  page?: number;
  /** @format double */
  limit?: number;
}

export interface IExchangeRateDto {
  baseCurrencyCode: string;
  targetCurrencyCode: string;
  /** @format double */
  rate: number;
  type: UExchangeRateType;
  /** @format date-time */
  asOf: string;
  source: string;
}

export interface IOpeningBalanceDto {
  amount: IMoneyDto;
  exchangeRate: IExchangeRateDto | null;
  /** @format date-time */
  date: string;
}

export interface IPettyCashAccountCreationReq {
  name: string;
  currencyCode: string;
  isControlAccount: boolean;
  controlAccountId?: string;
  openingBalance: IOpeningBalanceDto | null;
}

export interface IJournalHeaderDto {
  sourceType: UJournalEntrySourceType;
  memo: string | null;
  status: UJournalEntryStatus;
  /** @format date-time */
  effectiveDate: string;
  /** @format date-time */
  postedAt: string | null;
  /** @format date-time */
  voidedAt: string | null;
  voidingEntryId: string | null;
  /** @format double */
  version: number;
  createdBy: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface IExchangeRate {
  currencyPair: string;
  baseCurrencyCode: string;
  targetCurrencyCode: string;
  /** @format double */
  rate: number;
  type: UExchangeRateType;
  /** @format date-time */
  asOf: string;
  source: string;
  /** @format date-time */
  createdAt: string;
}

export interface IAccountTransactionRes {
  id: string;
  entryId: string;
  accountId: string;
  counterpartyId: string | null;
  /** @format double */
  sequenceOrder: number;
  amount: IMoneyDto;
  exchangeRate: IExchangeRate | null;
  functionalAmount: IMoneyDto;
  side: UJournalSide;
  description: string | null;
  /** @format double */
  version: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  header: IJournalHeaderDto;
  balanceEffect: ULedgerAccountBalanceEffect;
}

export interface IPaginatedResponseIAccountTransactionRes {
  data: IAccountTransactionRes[];
  meta: IPaginationResponseMeta;
}

export interface IPaginationDto {
  /** @format double */
  limit?: number;
  orderBy?: string;
  sortDirection?: UPaginationSortDirection;
  search?: string;
  /** @format double */
  page?: number;
}

export interface IJournalLineDto {
  id: string;
  entryId: string;
  accountId: string;
  counterpartyId: string | null;
  /** @format double */
  sequenceOrder: number;
  amount: IMoneyDto;
  exchangeRate: IExchangeRate | null;
  functionalAmount: IMoneyDto;
  side: UJournalSide;
  description: string | null;
  /** @format double */
  version: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface IJournalEntryDto {
  sourceType: UJournalEntrySourceType;
  memo: string | null;
  status: UJournalEntryStatus;
  /** @format date-time */
  effectiveDate: string;
  /** @format date-time */
  postedAt: string | null;
  /** @format date-time */
  voidedAt: string | null;
  voidingEntryId: string | null;
  /** @format double */
  version: number;
  createdBy: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  id: string;
  accountingEntityId: string;
  lines: IJournalLineDto[];
}

export interface IJournalCounterpartyReq {
  id?: string;
  name: string;
  type?: UCounterpartyType;
}

export interface IReceiptEntryLineReq {
  accountId: string;
  counterparty: IJournalCounterpartyReq;
  amount: IMoneyDto;
  exchangeRate: IExchangeRateDto | null;
  description: string | null;
  /** @format double */
  sequenceOrder: number;
}

export interface IReceiptEntryReq {
  sourceLine: IReceiptEntryLineReq;
  destinationLines: IReceiptEntryLineReq[];
  /** @format date-time */
  effectiveDate: string;
  /** @format date-time */
  postedAt: string | null;
  memo: string | null;
}

export interface ICurrencyDto {
  code: string;
  symbol: string;
  name: string;
  /** @format double */
  minorUnit: number;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickIPaginationDtoExcludeKeysSearchOrSortDirection {
  /** @format double */
  limit?: number;
  orderBy?: string;
  /** @format double */
  page?: number;
}

export interface IExchangeRateQueryParam {
  /** @format double */
  limit?: number;
  orderBy?: string;
  /** @format double */
  page?: number;
  currencyPair: string;
  type?: UExchangeRateType;
  /** @format date-time */
  asOf?: string;
}

export interface ICounterpartyDto {
  id: string;
  accountingEntityId: string;
  name: string;
  status: UCounterpartyStatus;
  type: UCounterpartyType;
  roles: UCounterpartyRole[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ICounterpartyCreateReq {
  name: string;
  status: UCounterpartyStatus;
  type: UCounterpartyType;
}

export interface IAddressDto {
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  countryCode: string;
}

export interface IVendorCreateReq {
  name: string;
  status: UCounterpartyStatus;
  type: UCounterpartyType;
  address?: IAddressDto;
}

export interface IContractorCreateReq {
  name: string;
  status: UCounterpartyStatus;
  type: UCounterpartyType;
  address: IAddressDto;
}

export interface IEmployerCreateReq {
  name: string;
  status: UCounterpartyStatus;
  type: UCounterpartyType;
  displayName?: string | null;
  address: IAddressDto;
}

export interface IPaginatedResponseICounterpartyDto {
  data: ICounterpartyDto[];
  meta: IPaginationResponseMeta;
}

export interface IGetCounterpartiesQuery {
  /** @format double */
  limit?: number;
  orderBy?: UCounterpartySortBy;
  sortDirection?: UPaginationSortDirection;
  search?: string;
  /** @format double */
  page?: number;
  roles?: UCounterpartyRole[];
  type?: UCounterpartyType;
  status?: UCounterpartyStatus;
}

export interface IBankDirectoryDto {
  countryCode: string;
  bankCode: string;
  bankName: string;
}

export interface IGetBanksQuery {
  countryCode: string;
}

export interface IUserSignupReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IVerifyEmailReq {
  token: string;
}

export interface IEmailLoginReq {
  email: string;
  password: string;
}

export interface IRequestPasswordResetReq {
  email: string;
}

export interface IResetPasswordReq {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IBankDetailsCreationReq {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface IBankAccountCreationReq {
  name: string;
  currencyCode: string;
  controlAccountId?: string;
  bankAccount: IBankDetailsCreationReq;
  openingBalance: IOpeningBalanceDto | null;
}

export interface IAccountingEntity {
  id: TEntityId;
  name: string;
  type: UAccountingEntityType;
  ownerId: TEntityId;
  functionalCurrencyCode: UCurrencyCode;
  jurisdictionCode: UJurisdictionCode;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

/** Fiscal year creation DTO */
export interface IFiscalYearCreationDto {
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
}

export interface IPeriodCreationDto {
  unit: UPeriodUnit;
  /**
   * @format int32
   * @min 1
   * @max 550
   */
  count: number;
}

/** Accounting entity onboarding DTO */
export interface IAccountingEntityCreationDto {
  name: string;
  entityType: UAccountingEntityType;
  jurisdictionCode: UJurisdictionCode;
  accountingStandardCode: UAccountingStandardCode;
  functionalCurrencyCode: UCurrencyCode;
  reportingCurrencyCode: UCurrencyCode;
  /** Fiscal year creation DTO */
  fiscalYear: IFiscalYearCreationDto;
  accountingPeriod: IPeriodCreationDto;
  reportingPeriod: IPeriodCreationDto;
  appPreferences: IUserAppPreferences;
}

export interface IAccountingEntitySwitchReq {
  accountingEntityId: string;
}

export interface IAccountingStandardDto {
  individual: string[];
  sole_trader: string[];
  private_company: string[];
}

export interface IJurisdictionDto {
  code: string;
  name: string;
  currencyCode: string;
  /** @format double */
  maxFiscalMonths: number;
  accountingStandards: IAccountingStandardDto;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export const EContentType = {
  Json: "application/json",
  JsonApi: "application/vnd.api+json",
  FormData: "multipart/form-data",
  UrlEncoded: "application/x-www-form-urlencoded",
  Text: "text/plain",
} as const;
export type ContentType = (typeof EContentType)[keyof typeof EContentType];

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === EContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === EContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title drimsheet-core
 * @version 0.1.0-alpha.1
 * @license AGPL-3.0-or-later
 * @baseUrl /api/v1
 * @contact Osahon Oboite
 *
 * This repo contains the server-side source code for Drimsheet's bookkeeping and tax app.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Get user preferences
     *
     * @tags User
     * @name GetUserPreferences
     * @request GET:/users/preferences
     * @secure
     */
    getUserPreferences: (params: RequestParams = {}) =>
      this.request<IUserPreferences, IHttpErrorDto>({
        path: `/users/preferences`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update user preferences
     *
     * @tags User
     * @name UpdateUserPreferences
     * @request PATCH:/users/preferences
     * @secure
     */
    updateUserPreferences: (
      data: IUserPreferencesUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<IUserPreferences, IHttpErrorDto>({
        path: `/users/preferences`,
        method: "PATCH",
        body: data,
        secure: true,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get authenticated user profile
     *
     * @tags User
     * @name GetAuthUserProfile
     * @request GET:/users/profile
     * @secure
     */
    getAuthUserProfile: (params: RequestParams = {}) =>
      this.request<IUserProfileDto, IHttpErrorDto>({
        path: `/users/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ledger = {
    /**
     * @description Get paginated ledger accounts with optional filters
     *
     * @tags Ledger
     * @name GetLedgerAccounts
     * @request GET:/ledger
     */
    getLedgerAccounts: (
      query?: {
        /** @format double */
        limit?: number;
        orderBy?: ULedgerAccountSortBy;
        sortDirection?: UPaginationSortDirection;
        search?: string;
        /** @format double */
        page?: number;
        type?: ULedgerType;
        subType?: ULedgerAccountSubType;
        behavior?: string;
        isControlAccount?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<IPaginatedResponseILedgerAccountDto, IHttpErrorDto>({
        path: `/ledger`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get paginated posting accounts permitted by a journal-entry rule
     *
     * @tags Ledger
     * @name GetPermittedPostingAccounts
     * @request GET:/ledger/posting-accounts
     */
    getPermittedPostingAccounts: (
      query: {
        sourceType: UJournalEntrySourceType;
        side: "source" | "destination";
        currencyCode?: string;
        /** @format double */
        page?: number;
        /** @format double */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IPaginatedResponseILedgerAccountDto, IHttpErrorDto>({
        path: `/ledger/posting-accounts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new petty cash sub account
     *
     * @tags Asset Accounts, Ledger
     * @name CreatePettyCashAccount
     * @request POST:/ledger/asset/petty-cash
     */
    createPettyCashAccount: (
      data: IPettyCashAccountCreationReq,
      params: RequestParams = {},
    ) =>
      this.request<ILedgerAccountDto, IHttpErrorDto>({
        path: `/ledger/asset/petty-cash`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single ledger account by id
     *
     * @tags Ledger
     * @name GetLedgerAccount
     * @request GET:/ledger/{accountId}
     */
    getLedgerAccount: (accountId: string, params: RequestParams = {}) =>
      this.request<ILedgerAccountDto, IHttpErrorDto>({
        path: `/ledger/${accountId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List transactions for an account
     *
     * @tags Ledger
     * @name ListTransactions
     * @request GET:/ledger/{accountId}/transactions
     */
    listTransactions: (
      accountId: string,
      query?: {
        /** @format double */
        limit?: number;
        orderBy?: string;
        sortDirection?: UPaginationSortDirection;
        search?: string;
        /** @format double */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IPaginatedResponseIAccountTransactionRes, IHttpErrorDto>({
        path: `/ledger/${accountId}/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  journalEntries = {
    /**
     * @description Create receipt journal entry
     *
     * @tags Journal Entry
     * @name CreateReceipt
     * @request POST:/journal-entries/receipt
     */
    createReceipt: (data: IReceiptEntryReq, params: RequestParams = {}) =>
      this.request<IJournalEntryDto, IHttpErrorDto>({
        path: `/journal-entries/receipt`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),
  };
  currencies = {
    /**
     * @description Gets all system currencies
     *
     * @tags Currency
     * @name GetAllCurrencies
     * @request GET:/currencies
     */
    getAllCurrencies: (params: RequestParams = {}) =>
      this.request<ICurrencyDto[], any>({
        path: `/currencies`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets all system exchange
     *
     * @tags Currency
     * @name GetExchangeRates
     * @request GET:/currencies/exchange-rates
     */
    getExchangeRates: (
      query: {
        /** @format double */
        limit?: number;
        orderBy?: string;
        /** @format double */
        page?: number;
        currencyPair: string;
        type?: UExchangeRateType;
        /** @format date-time */
        asOf?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IExchangeRate[], any>({
        path: `/currencies/exchange-rates`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  counterparties = {
    /**
     * @description Create a new counterparty
     *
     * @tags Counterparty
     * @name CreateCounterparty
     * @request POST:/counterparties
     */
    createCounterparty: (
      data: ICounterpartyCreateReq,
      params: RequestParams = {},
    ) =>
      this.request<ICounterpartyDto, IHttpErrorDto>({
        path: `/counterparties`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get counterparties
     *
     * @tags Counterparty
     * @name GetCounterparties
     * @request GET:/counterparties
     */
    getCounterparties: (
      query?: {
        /** @format double */
        limit?: number;
        orderBy?: UCounterpartySortBy;
        sortDirection?: UPaginationSortDirection;
        search?: string;
        /** @format double */
        page?: number;
        roles?: UCounterpartyRole[];
        type?: UCounterpartyType;
        status?: UCounterpartyStatus;
      },
      params: RequestParams = {},
    ) =>
      this.request<IPaginatedResponseICounterpartyDto, IHttpErrorDto>({
        path: `/counterparties`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new vendor
     *
     * @tags Counterparty
     * @name CreateVendor
     * @request POST:/counterparties/vendor
     */
    createVendor: (data: IVendorCreateReq, params: RequestParams = {}) =>
      this.request<ICounterpartyDto, IHttpErrorDto>({
        path: `/counterparties/vendor`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new contractor
     *
     * @tags Counterparty
     * @name CreateContractor
     * @request POST:/counterparties/contractor
     */
    createContractor: (
      data: IContractorCreateReq,
      params: RequestParams = {},
    ) =>
      this.request<ICounterpartyDto, IHttpErrorDto>({
        path: `/counterparties/contractor`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new employer
     *
     * @tags Counterparty
     * @name CreateEmployer
     * @request POST:/counterparties/employer
     */
    createEmployer: (data: IEmployerCreateReq, params: RequestParams = {}) =>
      this.request<ICounterpartyDto, IHttpErrorDto>({
        path: `/counterparties/employer`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),
  };
  banks = {
    /**
     * @description Get bank directory for a country
     *
     * @tags Bank
     * @name GetBanks
     * @request GET:/banks
     */
    getBanks: (
      query: {
        countryCode: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IBankDirectoryDto[], IHttpErrorDto>({
        path: `/banks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * @description User signup with email and password
     *
     * @tags Auth
     * @name SignupWithEmail
     * @request POST:/auth/signup-with-email
     */
    signupWithEmail: (data: IUserSignupReq, params: RequestParams = {}) =>
      this.request<void, IHttpErrorDto>({
        path: `/auth/signup-with-email`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        ...params,
      }),

    /**
     * @description Verify user email
     *
     * @tags Auth
     * @name VerifyEmail
     * @request POST:/auth/signup/complete
     */
    verifyEmail: (data: IVerifyEmailReq, params: RequestParams = {}) =>
      this.request<IAccessToken, IHttpErrorDto>({
        path: `/auth/signup/complete`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description User login with email and password
     *
     * @tags Auth
     * @name LoginWithEmail
     * @request POST:/auth/login-with-email
     */
    loginWithEmail: (data: IEmailLoginReq, params: RequestParams = {}) =>
      this.request<IAccessToken, IHttpErrorDto>({
        path: `/auth/login-with-email`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get password reset link
     *
     * @tags Auth
     * @name GetPasswordResetLink
     * @request POST:/auth/get-password-reset-link
     */
    getPasswordResetLink: (
      data: IRequestPasswordResetReq,
      params: RequestParams = {},
    ) =>
      this.request<void, IHttpErrorDto>({
        path: `/auth/get-password-reset-link`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        ...params,
      }),

    /**
     * @description Reset password
     *
     * @tags Auth
     * @name ResetPassword
     * @request POST:/auth/reset-password
     */
    resetPassword: (data: IResetPasswordReq, params: RequestParams = {}) =>
      this.request<IAccessToken, IHttpErrorDto>({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Start the Google OAuth flow. Redirects the user to Google for authentication.
     *
     * @tags Auth
     * @name LoginWithGoogle
     * @request GET:/auth/google
     */
    loginWithGoogle: (params: RequestParams = {}) =>
      this.request<any, void | IHttpErrorDto>({
        path: `/auth/google`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Google OAuth callback. Exchanges the Google user profile for an auth token and redirects to the client.
     *
     * @tags Auth
     * @name LoginWithGoogleCallback
     * @request GET:/auth/google/callback
     */
    loginWithGoogleCallback: (params: RequestParams = {}) =>
      this.request<any, void | IHttpErrorDto>({
        path: `/auth/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Refresh access token
     *
     * @tags Auth
     * @name RefreshAccessToken
     * @request POST:/auth/refresh-access-token
     */
    refreshAccessToken: (params: RequestParams = {}) =>
      this.request<IAccessToken, IHttpErrorDto>({
        path: `/auth/refresh-access-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Logout user
     *
     * @tags Auth
     * @name Logout
     * @request POST:/auth/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, IHttpErrorDto>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),
  };
  accounts = {
    /**
     * @description Create a new asset bank sub account
     *
     * @tags Asset Accounts, Accounts
     * @name CreateBankAccount
     * @request POST:/accounts/asset/bank
     */
    createBankAccount: (
      data: IBankAccountCreationReq,
      params: RequestParams = {},
    ) =>
      this.request<ILedgerAccountDto, IHttpErrorDto>({
        path: `/accounts/asset/bank`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),
  };
  accounting = {
    /**
     * @description Create a new accounting entity
     *
     * @tags Accounting
     * @name CreateAccountingEntity
     * @request POST:/accounting/accounting-entity
     */
    createAccountingEntity: (
      data: IAccountingEntityCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<IAccountingEntity, IHttpErrorDto>({
        path: `/accounting/accounting-entity`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get active accounting entity
     *
     * @tags Accounting
     * @name GetActiveAccountingEntity
     * @request GET:/accounting/accounting-entity
     */
    getActiveAccountingEntity: (params: RequestParams = {}) =>
      this.request<IAccountingEntity, IHttpErrorDto>({
        path: `/accounting/accounting-entity`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Switch the current accounting entity
     *
     * @tags Accounting
     * @name SwitchAccountingEntity
     * @request POST:/accounting/accounting-entity/switch
     */
    switchAccountingEntity: (
      data: IAccountingEntitySwitchReq,
      params: RequestParams = {},
    ) =>
      this.request<IAccountingEntity, IHttpErrorDto>({
        path: `/accounting/accounting-entity/switch`,
        method: "POST",
        body: data,
        type: EContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get jurisdictions
     *
     * @tags Accounting
     * @name GetJurisdictions
     * @request GET:/accounting/jurisdictions
     */
    getJurisdictions: (params: RequestParams = {}) =>
      this.request<IJurisdictionDto[], IHttpErrorDto>({
        path: `/accounting/jurisdictions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get user accounting entities
     *
     * @tags Accounting
     * @name GetUserAccountingEntities
     * @request GET:/accounting/accounting-entities
     */
    getUserAccountingEntities: (params: RequestParams = {}) =>
      this.request<IAccountingEntity[], IHttpErrorDto>({
        path: `/accounting/accounting-entities`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
