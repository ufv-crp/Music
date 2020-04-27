import { removeAllLocalStorage } from "../../../states"

import { createHashHistory } from "history"

const logout = () => {
  removeAllLocalStorage()

  const history = createHashHistory()

  history.go("/login")
}

export { logout }
