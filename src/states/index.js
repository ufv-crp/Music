import {
  AuthenticationContext,
  AuthenticationProvider,
  initialStateAuthentication
} from "./authentication";

import {
  UserContext,
  UserProvider,
  initialStateUser
} from "./user";

import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

export {
  UserContext,
  UserProvider,
  initialStateUser,
  AuthenticationContext,
  AuthenticationProvider,
  initialStateAuthentication,
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem
};
