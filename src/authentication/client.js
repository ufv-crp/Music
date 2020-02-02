import { createClient } from "../graphql";

import { getLocalStorageItem } from "../states";

import { initialStateAuthentication } from "../states";

const createAuthenticatedClient = ({ token = null }) => {
  const authentication = getLocalStorageItem({
    key: "authentication",
    initialStage: initialStateAuthentication
  });

  return createClient({
    headers: { Authorization: `Bearer ${token ? token : authentication.token}` }
  });
};

export { createAuthenticatedClient };
