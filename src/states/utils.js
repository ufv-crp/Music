import * as SecureLS from "secure-ls";

let ls = new SecureLS({
  encodingType: "aes",
  isCompression: true,
  encryptionSecret: process.env.REACT_APP_SECRET_STORE
});

const getLocalStorageItem = ({ key, initialState }) => {
  const item = ls.get(key);

  return item ? item : initialState;
};

const setLocalStorageItem = ({ key, data }) => {
  ls.set(key, data);
};

const removeLocalStorageItem = ({ key }) => {
  ls.remove(key);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
