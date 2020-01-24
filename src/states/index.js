import {
  AuthenticationContext,
  AuthenticationProvider,
  initialState
} from "./authentication";

import {
  UserContext,
  UserProvider,
  initialUserState
} from "./user";

import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

export {
  UserContext,
  UserProvider,
  initialUserState,
  AuthenticationContext,
  AuthenticationProvider,
  initialState,
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem
};
