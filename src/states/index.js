import {
  AuthenticationContext,
  AuthenticationProvider,
  initialStateAuthentication
} from "./authentication"

import { UserContext, UserProvider, initialStateUser } from "./user"

import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  removeAllLocalStorage
} from "./utils"

export {
  UserContext,
  UserProvider,
  initialStateUser,
  AuthenticationContext,
  AuthenticationProvider,
  initialStateAuthentication,
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  removeAllLocalStorage
}
