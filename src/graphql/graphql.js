import { GraphQLClient } from "graphql-request"

const createClient = ({ headers }) => {
  return new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL, {
    headers
  })
}

export { createClient }
