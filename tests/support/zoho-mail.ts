import axios from "axios";

import {
  ZOHO_MAIL_ACCOUNTS_BASE,
  ZOHO_MAIL_ACCOUNT_ID,
  ZOHO_MAIL_API_BASE,
  ZOHO_MAIL_CLIENT_ID,
  ZOHO_MAIL_CLIENT_SECRET,
  ZOHO_MAIL_REFRESH_TOKEN,
} from "../../config/vars.ts";
import { EZohoMailboxFolderName } from "../types/zoho-mail.types.ts";
import type {
  IGetEmailContentParams,
  IMakeSearchParamsPayload,
  IZohoAccessTokenResponse,
  IZohoApiResponse,
  IZohoCachedAccessToken,
  IZohoMailAccount,
  IZohoMailFolder,
  IZohoMailListParams,
  IZohoMailMessageContent,
  IZohoMailMessageOverview,
  IZohoMailboxFolders,
  UZohoMailboxFolderName,
} from "../types/zoho-mail.types.ts";

/**
 * Returns a required configuration value after confirming it is present.
 *
 * @param name - Configuration variable name used in the error message.
 * @param value - Configuration value to validate.
 * @returns The validated configuration value.
 * @throws When the value is empty or undefined.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

/**
 * Builds form-encoded search parameters while enforcing required values.
 *
 * @param payload - Parameter definitions to validate and append.
 * @returns URL-encoded parameters suitable for an OAuth token request body.
 * @throws When a required parameter has no value.
 */
function makeUrlSearchParams(
  payload: IMakeSearchParamsPayload[],
): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const { key, value, required } of payload) {
    if (!value) {
      if (required) {
        throw new Error(`${key} is required.`);
      }

      continue;
    }

    searchParams.append(key, value);
  }

  return searchParams;
}

const zohoAccountsApi = axios.create({
  baseURL: required("ZOHO_MAIL_ACCOUNTS_BASE", ZOHO_MAIL_ACCOUNTS_BASE),
});

const zohoMailApi = axios.create({
  baseURL: required("ZOHO_MAIL_API_BASE", ZOHO_MAIL_API_BASE),
});

const ACCESS_TOKEN_EXPIRY_SKEW_MS = 60_000;

let cachedAccessToken: IZohoCachedAccessToken | undefined;
let accessTokenRequest: Promise<string> | undefined;

/**
 * Exchanges the configured Zoho refresh token for a short-lived access token.
 *
 * @returns The access token required to authorize Zoho Mail API requests.
 * @throws When required OAuth configuration is missing or Zoho rejects the
 * token request.
 */
export async function refreshAccessToken() {
  const response = await zohoAccountsApi.post<IZohoAccessTokenResponse>(
    "/oauth/v2/token",
    makeUrlSearchParams([
      {
        key: "client_id",
        value: ZOHO_MAIL_CLIENT_ID,
        required: true,
      },
      {
        key: "client_secret",
        value: ZOHO_MAIL_CLIENT_SECRET,
        required: true,
      },
      {
        key: "refresh_token",
        value: ZOHO_MAIL_REFRESH_TOKEN,
        required: true,
      },
      {
        key: "grant_type",
        value: "refresh_token",
        required: true,
      },
    ]),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const { access_token: accessToken, expires_in: expiresIn } = response.data;

  if (!accessToken) {
    throw new Error("Zoho did not return an access token.");
  }

  if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
    throw new Error("Zoho returned an invalid access token expiry.");
  }

  cachedAccessToken = {
    value: accessToken,
    expiresAt:
      Date.now() + Math.max(expiresIn * 1_000 - ACCESS_TOKEN_EXPIRY_SKEW_MS, 0),
  };

  return accessToken;
}

/**
 * Returns a cached Zoho access token or refreshes it when it is absent or near
 * expiry. Concurrent callers share the same refresh request.
 *
 * @returns A valid access token for Zoho Mail API requests.
 */
async function getAccessToken() {
  if (cachedAccessToken && Date.now() < cachedAccessToken.expiresAt) {
    return cachedAccessToken.value;
  }

  accessTokenRequest ??= refreshAccessToken().finally(() => {
    accessTokenRequest = undefined;
  });

  return accessTokenRequest;
}

zohoMailApi.interceptors.request.use(async (request) => {
  request.headers.set("Accept", "application/json");

  if (!request.headers.has("Authorization")) {
    const accessToken = await getAccessToken();
    request.headers.set("Authorization", `Zoho-oauthtoken ${accessToken}`);
  }

  return request;
});

/**
 * Retrieves the mail accounts belonging to the authenticated Zoho user.
 *
 * @returns The user's Zoho Mail accounts.
 * @throws When Zoho rejects the request.
 */
export async function getZohoMailAccounts(): Promise<IZohoMailAccount[]> {
  const response =
    await zohoMailApi.get<IZohoApiResponse<IZohoMailAccount[]>>(
      "/api/accounts",
    );

  if (response.data.status.code !== 200) {
    throw new Error(
      `Failed to fetch Zoho Mail accounts (${response.data.status.code}: ${response.data.status.description}).`,
    );
  }

  return response.data.data;
}

/**
 * Retrieves all folders belonging to the configured Zoho Mail account.
 *
 * @returns The configured mailbox's folders.
 * @throws When the account ID is missing or Zoho rejects the request.
 */
export async function getMailboxFolders(): Promise<
  Partial<IZohoMailboxFolders>
> {
  const accountId = required("ZOHO_MAIL_ACCOUNT_ID", ZOHO_MAIL_ACCOUNT_ID);
  const response = await zohoMailApi.get<IZohoApiResponse<IZohoMailFolder[]>>(
    `/api/accounts/${encodeURIComponent(accountId)}/folders`,
  );

  if (response.data.status.code !== 200) {
    throw new Error(
      `Failed to fetch Zoho mailbox folders (${response.data.status.code}: ${response.data.status.description}).`,
    );
  }

  const folders: Partial<IZohoMailboxFolders> = {};

  for (const folder of response.data.data) {
    switch (folder.path.toLowerCase()) {
      case `/${EZohoMailboxFolderName.Inbox}`:
        folders[EZohoMailboxFolderName.Inbox] = folder;
        break;
      case `/${EZohoMailboxFolderName.Drafts}`:
        folders[EZohoMailboxFolderName.Drafts] = folder;
        break;
      case `/${EZohoMailboxFolderName.Templates}`:
        folders[EZohoMailboxFolderName.Templates] = folder;
        break;
      case `/${EZohoMailboxFolderName.Snoozed}`:
        folders[EZohoMailboxFolderName.Snoozed] = folder;
        break;
      case `/${EZohoMailboxFolderName.Sent}`:
        folders[EZohoMailboxFolderName.Sent] = folder;
        break;
      case `/${EZohoMailboxFolderName.Spam}`:
        folders[EZohoMailboxFolderName.Spam] = folder;
        break;
      case `/${EZohoMailboxFolderName.Trash}`:
        folders[EZohoMailboxFolderName.Trash] = folder;
        break;
      case `/${EZohoMailboxFolderName.Outbox}`:
        folders[EZohoMailboxFolderName.Outbox] = folder;
        break;
    }
  }

  return folders;
}

/**
 * Retrieves messages from a named folder in the configured Zoho mailbox.
 *
 * @param folderName - Configured mailbox folder to retrieve messages from.
 * @param params - Optional Zoho message-list query parameters.
 * @returns Messages from the selected folder.
 * @throws When the account ID or selected folder is missing, or Zoho rejects the
 * request.
 */
export async function getMailbox(
  folderName: UZohoMailboxFolderName,
  params: IZohoMailListParams = {},
): Promise<IZohoMailMessageOverview[]> {
  const accountId = required("ZOHO_MAIL_ACCOUNT_ID", ZOHO_MAIL_ACCOUNT_ID);
  const folders = await getMailboxFolders();
  const folder = folders[folderName];

  if (!folder) {
    throw new Error(`Zoho ${folderName} folder was not found.`);
  }

  const response = await zohoMailApi.get<
    IZohoApiResponse<IZohoMailMessageOverview[]>
  >(`/api/accounts/${encodeURIComponent(accountId)}/messages/view`, {
    params: {
      start: 1,
      limit: 50,
      sortBy: "date",
      sortorder: false,
      includeto: true,
      ...params,
      folderId: folder.folderId,
    },
  });

  if (response.data.status.code !== 200) {
    throw new Error(
      `Failed to fetch Zoho ${folderName} messages (${response.data.status.code}: ${response.data.status.description}).`,
    );
  }

  return response.data.data;
}

/**
 * Finds the newest message in the selected folder matching the supplied
 * criteria and returns its HTML content and folder ID.
 *
 * The subject criterion intentionally matches Zoho's message summary. Address
 * and text comparisons are case-insensitive, and the date cutoff is applied to
 * the received timestamp before the content endpoint is called.
 *
 * @param params - Folder and optional criteria used to select a message.
 * @returns The matched message's ID, folder ID, and HTML content.
 * @throws When the cutoff is invalid, no message matches, required
 * configuration is missing, or Zoho rejects a request.
 */
export async function getEmailContent(params: IGetEmailContentParams) {
  const { folderName, isUnread, subject, fromAddress, toAddress, dateCutoff } =
    params;
  const cutoffTimestamp = dateCutoff?.getTime();

  if (cutoffTimestamp !== undefined && !Number.isFinite(cutoffTimestamp)) {
    throw new Error("dateCutoff must be a valid Date.");
  }

  let mailboxStatus: IZohoMailListParams["status"] = "all";
  let expectedStatus: "0" | "1" | undefined;

  if (isUnread === true) {
    mailboxStatus = "unread";
    expectedStatus = "0";
  } else if (isUnread === false) {
    mailboxStatus = "read";
    expectedStatus = "1";
  }

  const messages = await getMailbox(folderName, {
    limit: 200,
    status: mailboxStatus,
  });
  const normalizedSubject = subject?.toLowerCase();
  const normalizedFromAddress = fromAddress?.toLowerCase();
  const normalizedToAddress = toAddress?.toLowerCase();
  const message = messages.find((candidate) => {
    const receivedTimestamp = Number(candidate.receivedTime);

    return (
      (expectedStatus === undefined || candidate.status === expectedStatus) &&
      (!normalizedSubject ||
        candidate.subject.toLowerCase().includes(normalizedSubject)) &&
      (!normalizedFromAddress ||
        candidate.fromAddress.toLowerCase() === normalizedFromAddress) &&
      (!normalizedToAddress ||
        candidate.toAddress.toLowerCase().includes(normalizedToAddress)) &&
      (cutoffTimestamp === undefined ||
        (Number.isFinite(receivedTimestamp) &&
          receivedTimestamp >= cutoffTimestamp))
    );
  });

  if (!message) {
    throw new Error(
      `No Zoho ${folderName} message matched the supplied criteria.`,
    );
  }

  const accountId = required("ZOHO_MAIL_ACCOUNT_ID", ZOHO_MAIL_ACCOUNT_ID);
  const response = await zohoMailApi.get<
    IZohoApiResponse<Omit<IZohoMailMessageContent, "folderId">>
  >(
    `/api/accounts/${encodeURIComponent(accountId)}/folders/${encodeURIComponent(message.folderId)}/messages/${encodeURIComponent(message.messageId)}/content`,
    {
      params: {
        includeBlockContent: false,
      },
    },
  );

  if (response.data.status.code !== 200) {
    throw new Error(
      `Failed to fetch Zoho email content (${response.data.status.code}: ${response.data.status.description}).`,
    );
  }

  return {
    ...response.data.data,
    folderId: message.folderId,
  };
}

/**
 * Moves a Zoho mailbox message to the Trash folder.
 *
 * The message is not permanently expunged, so an accidental deletion remains
 * recoverable until the mailbox's Trash retention removes it.
 *
 * @param message - IDs of the message and its containing folder.
 * @returns Zoho's response data containing the delete-operation change ID.
 * @throws When either message identifier or the account ID is missing, or Zoho
 * rejects the request.
 */
export async function deleteEmail(
  message: Pick<IZohoMailMessageContent, "messageId" | "folderId">,
) {
  const messageId = message.messageId.trim();
  const folderId = message.folderId.trim();

  if (!messageId) {
    throw new Error("Zoho message ID is required.");
  }

  if (!folderId) {
    throw new Error("Zoho folder ID is required.");
  }

  const accountId = required("ZOHO_MAIL_ACCOUNT_ID", ZOHO_MAIL_ACCOUNT_ID);
  const response = await zohoMailApi.delete<IZohoApiResponse<{ cId: string }>>(
    `/api/accounts/${encodeURIComponent(accountId)}/folders/${encodeURIComponent(folderId)}/messages/${encodeURIComponent(messageId)}`,
    {
      params: {
        expunge: false,
      },
    },
  );

  if (response.data.status.code !== 200) {
    throw new Error(
      `Failed to delete Zoho email (${response.data.status.code}: ${response.data.status.description}).`,
    );
  }

  return response.data.data;
}
