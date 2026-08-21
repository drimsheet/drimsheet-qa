export interface IZohoAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
}

export interface IZohoCachedAccessToken {
  value: string;
  expiresAt: number;
}

export interface IZohoApiResponse<T> {
  status: {
    code: number;
    description: string;
  };
  data: T;
}

export interface IMakeSearchParamsPayload {
  key: string;
  value: string | undefined;
  required: boolean;
}

export interface IZohoMailEmailAddress {
  isAlias: boolean;
  isPrimary: boolean;
  mailId: string;
  isConfirmed: boolean;
}

export interface IZohoMailAllowedFeatures {
  PEOPLE_INTEG: boolean;
  VAULT_ARCHIVE: boolean;
  WORKPLACE_WELCOME_MAIL: boolean;
  RETENTION: boolean;
  HUGE_ATTACHMENT: boolean;
  WALLET_CREDIT_REFERRAL: boolean;
  DLP: boolean;
  TEAMINBOX_OFFER: boolean;
  BACKUP: boolean;
  SMIME: boolean;
  ZMMIGRATION_PST_MAIL_EXPORT: boolean;
  CALENDAR_MEETING_CO_HOST: boolean;
  EDISCOVERY_WORKPLACE: boolean;
  DOCS_ADMIN_GOVERANCE: boolean;
  RESOURCE_BOOKING: boolean;
  WORKPLACE_HOME_PAGE: boolean;
  HUGE_ATTACHMENT_NEW: boolean;
  DOCS_REPORTS: boolean;
  DOCS_COMBINED_STORAGE: boolean;
}

export interface IZohoMailSendDetails {
  sendMailId: string;
  displayName: string;
  serverName: string;
  signatureId: string | null;
  serverPort: number;
  userName: string;
  connectionType: string;
  mode: string;
  validated: boolean;
  fromAddress: string;
  smtpConnection: number;
  validationRequired: boolean;
  validationState: number;
  status: boolean;
}

export interface IZohoMailAccountAddress {
  country: string;
  streetAddr: string;
  extension: string;
  phoneNumber: string;
  city: string;
  mobileNumber: string;
  seatingLocation: string;
  postalCode: string;
  timeZone: string;
  state: string;
  fax: string;
}

export interface IZohoMailPolicy {
  zoid: number;
  [policyId: string]: string | number;
}

export interface IZohoMailAccount {
  country: string;
  lastLogin: number;
  mxStatus: boolean;
  activeSyncEnabled: boolean;
  isDefaultAccount: boolean;
  mobileNumber: string;
  incomingBlocked: boolean;
  language: string;
  isOUAdmin: boolean;
  type: "ZOHO_ACCOUNT";
  extraStorage: Record<string, unknown>;
  incomingUserName: string;
  emailAddress: IZohoMailEmailAddress[];
  mailboxStatus: string;
  popBlocked: boolean;
  usedStorage: number;
  spamcheckEnabled: boolean;
  imapAccessEnabled: boolean;
  timeZone: string;
  accountCreationTime: number;
  zuid: number;
  webBlocked: boolean;
  planStorage: number;
  firstName: string;
  accountId: string;
  sequence: number;
  phoneNumber: string;
  allowed_features: IZohoMailAllowedFeatures;
  mailboxAddress: string;
  lastPasswordReset: number;
  tfaEnabled: boolean;
  iamStatus: number;
  phoneNumer: string;
  status: boolean;
  lastName: string;
  accountDisplayName: string;
  role: string;
  gender: string;
  accountName: string;
  displayName: string;
  isLogoExist: boolean;
  URI: string;
  primaryEmailAddress: string;
  enabled: boolean;
  mailboxCreationTime: number;
  basicStorage: string;
  lastClient: string;
  allowedStorage: number;
  sendMailDetails: IZohoMailSendDetails[];
  popFetchTime: number;
  address: IZohoMailAccountAddress;
  planType: number;
  userExpiry: number;
  popAccessEnabled: boolean;
  deliveryType: string;
  imapBlocked: boolean;
  iamUserRole: string;
  outgoingBlocked: boolean;
  policyId: IZohoMailPolicy;
  isDesignatedMailbox: boolean;
  smtpStatus: boolean;
  extraEDiscoveryStorage: Record<string, unknown>;
}

export interface IZohoMailFolder {
  path: string;
  previousFolderId?: string;
  isArchived: number;
  folderName: string;
  imapAccess: boolean;
  folderType: string;
  URI: string;
  folderId: string;
}

export const EZohoMailboxFolderName = {
  Inbox: "inbox",
  Drafts: "drafts",
  Templates: "templates",
  Snoozed: "snoozed",
  Sent: "sent",
  Spam: "spam",
  Trash: "trash",
  Outbox: "outbox",
} as const;

export type UZohoMailboxFolderName =
  (typeof EZohoMailboxFolderName)[keyof typeof EZohoMailboxFolderName];

export interface IZohoMailboxFolders {
  [EZohoMailboxFolderName.Inbox]: IZohoMailFolder;
  [EZohoMailboxFolderName.Drafts]: IZohoMailFolder;
  [EZohoMailboxFolderName.Templates]: IZohoMailFolder;
  [EZohoMailboxFolderName.Snoozed]: IZohoMailFolder;
  [EZohoMailboxFolderName.Sent]: IZohoMailFolder;
  [EZohoMailboxFolderName.Spam]: IZohoMailFolder;
  [EZohoMailboxFolderName.Trash]: IZohoMailFolder;
  [EZohoMailboxFolderName.Outbox]: IZohoMailFolder;
}

export interface IZohoMailListParams {
  start?: number;
  limit?: number;
  status?: "all" | "read" | "unread";
  flagid?: 0 | 1 | 2 | 3;
  labelid?: string;
  threadId?: string;
  sortBy?: "date" | "messageId" | "size";
  sortorder?: boolean;
  includeto?: boolean;
  includesent?: boolean;
  includearchive?: boolean;
  attachedMails?: boolean;
  inlinedMails?: boolean;
  flaggedMails?: boolean;
  respondedMails?: boolean;
  threadedMails?: boolean;
}

export interface IZohoMailMessageOverview {
  summary: string;
  sentDateInGMT: string;
  calendarType: number;
  subject: string;
  messageId: string;
  threadCount: string;
  flagid: string;
  status2: string;
  priority: string;
  hasInline: string;
  toAddress: string;
  folderId: string;
  ccAddress: string;
  threadId: string;
  hasAttachment: string;
  size: string;
  sender: string;
  receivedTime: string;
  fromAddress: string;
  status: string;
}

export interface IGetEmailContentParams {
  folderName: UZohoMailboxFolderName;
  isUnread?: boolean;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  dateCutoff?: Date;
}

export interface IZohoMailMessageContent {
  messageId: string;
  content: string;
  folderId: string;
}
