import { createClient } from "../graphql";

const createAuthenticatedClient = ({ token }) => {
  return createClient({ headers: { Authorization: token } });
};

export { createAuthenticatedClient }