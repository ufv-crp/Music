import React, { createContext, useReducer, useEffect } from "react";

import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

const localStorageUserKey = "user";

const initialUserState = { matriculation: "", firstName: "", secondName: "" };

const reducer = (previousState, newState) => {
  if (newState === null) {
    removeLocalStorageItem({ key: localStorageUserKey });

    return initialUserState;
  }

  return { ...previousState, ...newState };
};

const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useReducer(
    reducer,
    getLocalStorageItem({ key: localStorageUserKey, initialUserState })
  );

  useEffect(() => {
    setLocalStorageItem({
      key: localStorageUserKey,
      data: user
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, initialUserState };
