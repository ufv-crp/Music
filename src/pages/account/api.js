const searchUser = `
    query SearchUser($id: Int!) {
        searchUser(id: $id) {
            id
            email
            cpf
            matriculation
            firstName
            secondName
            creator {
              id
              email
              matriculation
            }
            createdAt
            updatedAt
        }
    }
`;

const updateUserById = `
    mutation UpdateUser($params: UserUpdateInput!) {
        updateUser(params: $params) {
            id
            password
            cpf
            matriculation
            firstName
            secondName
        }
  }
`;

export { searchUser, updateUserById };
