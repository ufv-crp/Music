import { request } from "graphql-request";

const authenticate = async (email, password) => {
  const query = `
		query Login($email: String!, $password: String!) {
			login(email: $email, password: $password){
				userId
				token
				tokenExpiration
				scopes
			}
	  	}
	`;

  try {
    return await request(process.env.REACT_APP_GRAPHQL_URL, query, {
      email,
      password
    });
  } catch (error) {
    return error;
  }
};

export { authenticate };
