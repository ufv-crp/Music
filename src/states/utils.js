import SecureLS from "secure-ls"

const encryptLocalStorage = true

let ls = new SecureLS({
  encodingType: "aes",
  isCompression: true,
  encryptionSecret: process.env.REACT_APP_SECRET_STORE
})

const getLocalStorageItem = ({ key, initialState }) => {
  const item = encryptLocalStorage
    ? ls.get(key)
    : JSON.parse(localStorage.getItem(key))

  return item ? item : initialState
}

const setLocalStorageItem = ({ key, data }) => {
  encryptLocalStorage
    ? ls.set(key, data)
    : localStorage.setItem(key, JSON.stringify(data))
}

const removeLocalStorageItem = ({ key }) => {
  encryptLocalStorage ? ls.remove(key) : localStorage.removeItem(key)
}

const removeAllLocalStorage = () => {
  encryptLocalStorage ? ls.removeAll() : localStorage.clear()
}

export {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  removeAllLocalStorage
}
