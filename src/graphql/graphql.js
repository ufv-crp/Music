import { GraphQLClient } from "graphql-request";

const createClient = ({ endpoint, headers }) => {
  return new GraphQLClient(endpoint | process.env.REACT_APP_GRAPHQL_URL, {
    headers
  });
};

export { createClient };
