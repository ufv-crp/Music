import React, { createContext, useReducer, useEffect } from "react"

import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem
} from "./utils"

const localStorageUserKey = "user"

const initialStateUser = { matriculation: "", firstName: "", secondName: "" }

const reducer = (previousState, newState) => {
  if (newState === null) {
    removeLocalStorageItem({ key: localStorageUserKey })

    return initialStateUser
  }

  return { ...previousState, ...newState }
}

const UserContext = createContext(initialStateUser)

const UserProvider = ({ children }) => {
  const [user, setUser] = useReducer(
    reducer,
    getLocalStorageItem({
      key: localStorageUserKey,
      initialState: initialStateUser
    })
  )

  useEffect(() => {
    setLocalStorageItem({
      key: localStorageUserKey,
      data: user
    })
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider, initialStateUser }
