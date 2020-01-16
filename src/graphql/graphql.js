import { GraphQLClient } from "graphql-request";

const createClient = ({ url = false, headers }) => {
  return new GraphQLClient(url | process.env.REACT_APP_GRAPHQL_URL, {
    headers
  });
};

export { createClient };
