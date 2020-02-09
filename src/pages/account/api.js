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

const listAddressById = `
    query ListAddresses($userId: Int!) {
        listAddresses(userId: $userId) {
          id
          street
          number
          complement
          city
          state
          zipCode
          createdAt
          updatedAt
        }
    }
`;

const updateAddressById = `
    mutation UpdateAddress($params: AddressUpdate!) {
        updateAddress(params: $params) {
            id
            street
            number
            complement
            city
            state
            zipCode
        }
  }
`;

const listContactById = `
    query ListContacts($userId: Int!) {
        listContacts(userId: $userId) {
            id
            email
            phone
            createdAt
            updatedAt
            userId
        }
    }
`;

const updateContactById = `
    mutation UpdateContact($params: ContactUpdate!) {
        updateContact(params: $params) {
            id
            email
            phone
            createdAt
            updatedAt
            userId
        }
    }
`;

export {
  searchUser,
  updateUserById,
  listAddressById,
  updateAddressById,
  listContactById,
  updateContactById
};
