import { createClient } from "../graphql"

import { getLocalStorageItem } from "../states"

import { initialStateAuthentication } from "../states"

const createAuthenticatedClient = () => {
  const authentication = getLocalStorageItem({
    key: "authentication",
    initialStage: initialStateAuthentication
  })

  return createClient({
    headers: {
      Authorization: `Bearer ${authentication ? authentication.token : ""}`
    }
  })
}

export { createAuthenticatedClient }
