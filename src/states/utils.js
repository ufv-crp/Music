import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.REACT_APP_SECRET_STORE);

const getLocalStorageItem = ({ key, initialState }) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(cryptr.decrypt(item)) : initialState;
};

const setLocalStorageItem = ({ key, data }) => {
  localStorage.setItem(key, cryptr.encrypt(JSON.stringify(data)));
};

const removeLocalStorageItem = ({ key }) => {
  localStorage.removeItem(key);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
