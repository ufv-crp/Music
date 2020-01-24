const listUserById = `
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

export { listUserById };
