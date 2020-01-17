import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.REACT_APP_SECRET_STORE);

const getLocalStorageItem = ({ key, initialState }) => {
  const localState = localStorage.getItem(key);

  return localState ? JSON.parse(cryptr.decrypt(localState)) : initialState;
};

const setLocalStorageItem = ({ key, data }) => {
  localStorage.setItem(key, cryptr.encrypt(JSON.stringify(data)));
};

const removeLocalStorageItem = ({ key }) => {
  localStorage.removeItem(key);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
