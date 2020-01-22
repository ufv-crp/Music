import { createClient } from "../graphql";

const createAuthenticatedClient = ({ token }) => {
  return createClient({ headers: { Authorization: `Bearer ${token}` } });
};

export { createAuthenticatedClient };
