/**
 * Action types and action creator related to the Authentication.
 */

import {
  ActionType,
  createAction,
  createStandardAction
} from "typesafe-actions";

import { PublicSession } from "../../../definitions/backend/PublicSession";
import { IdentityProvider } from "../../models/IdentityProvider";
import { SessionToken } from "../../types/SessionToken";

export type LogoutOption = {
  keepUserData: boolean;
};

export type LogoutError = {
  error: Error;
  options: LogoutOption;
};

export const idpSelected = createStandardAction("IDP_SELECTED")<
  IdentityProvider
>();

//
// Action about IDP Login phase
//

export const idpLoginUrlChanged = createStandardAction(
  "AUTHENTICATION_WEBVIEW_URL_CHANGED"
)<{ url: string }>();
export const loginSuccess = createStandardAction("LOGIN_SUCCESS")<
  SessionToken
>();

export const loginFailure = createStandardAction("LOGIN_FAILURE")();

export const logoutRequest = createStandardAction("LOGOUT_REQUEST")<
  LogoutOption
>();

export const logoutSuccess = createStandardAction("LOGOUT_SUCCESS")<
  LogoutOption
>();

export const logoutFailure = createAction(
  "LOGOUT_FAILURE",
  resolve => (logoutError: LogoutError) => resolve(logoutError, true)
);

export const sessionInformationLoadSuccess = createStandardAction(
  "SESSION_INFO_LOAD_SUCCESS"
)<PublicSession>();

export const sessionInformationLoadFailure = createAction(
  "SESSION_INFO_LOAD_FAILURE",
  resolve => (error: Error) => resolve(error, true)
);

export const sessionExpired = createStandardAction("SESSION_EXPIRED")();

export const sessionInvalid = createStandardAction("SESSION_INVALID")();

export const forgetCurrentSession = createStandardAction("SESSION_FORGET")();

export type AuthenticationActions =
  | ActionType<typeof idpSelected>
  | ActionType<typeof idpLoginUrlChanged>
  | ActionType<typeof loginSuccess>
  | ActionType<typeof loginFailure>
  | ActionType<typeof logoutRequest>
  | ActionType<typeof logoutSuccess>
  | ActionType<typeof logoutFailure>
  | ActionType<typeof sessionInformationLoadSuccess>
  | ActionType<typeof sessionInformationLoadFailure>
  | ActionType<typeof sessionExpired>
  | ActionType<typeof sessionInvalid>
  | ActionType<typeof forgetCurrentSession>;
