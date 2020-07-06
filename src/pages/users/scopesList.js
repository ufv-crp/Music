const scopesList = [
  {
    id: 1,
    name: "searchUser",
    label: "Pesquisar Usuários",
    description: "Search user by id",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 2,
    name: "createUser",
    label: "Criar Usuários",
    description: "Create user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 3,
    name: "removeUser",
    label: "Remover Usuários",
    description: "Remove user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 4,
    name: "updateUser",
    label: "Atualizar Usuários",
    description: "Update user attributes values",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 5,
    name: "listUsers",
    label: "Listar Usuários",
    description: "List all users registered by an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 11,
    name: "listContacts",
    label: "Listar Contatos de Usuário",
    description: "List all contacts of an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 12,
    name: "createContact",
    label: "Criar Contatos de Usuário",
    description: "Create an user contact",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 13,
    name: "removeContact",
    label: "Remover Contatos de Usuário",
    description: "Remove an user contact",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 14,
    name: "updateContact",
    label: "Atualizar Contatos de Usuário",
    description: "Update an user contact",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 15,
    name: "listAddresses",
    label: "Listar Endereços de Usuário",
    description: "List all addresses of an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 16,
    name: "createAddress",
    label: "Criar Endereços de Usuário",
    description: "Create an user address",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 17,
    name: "removeAddress",
    label: "Remover Endereços de Usuário",
    description: "Remove an user address",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 18,
    name: "updateAddress",
    label: "Atualizar Endereços de Usuário",
    description: "Update an user address",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 19,
    name: "searchCourses",
    label: "Pesquisar Cursos",
    description: "Search courses by id, title, start, end or creator",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 20,
    name: "listCourses",
    label: "Listar Cursos",
    description: "List not private courses and private courses",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 21,
    name: "createCourse",
    label: "Criar Cursos",
    description: "Create course",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 22,
    name: "removeCourse",
    label: "Remover Cursos",
    description: "Remove course",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 23,
    name: "updateCourse",
    label: "Atualizar Cursos",
    description: "Update course attributes values",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 28,
    name: "listCourseUsers",
    label: "Listar Cursos de Usuários",
    description: "List courses associate to users",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 29,
    name: "createCourseUser",
    label: "Criar Relação de Curso e Usuário",
    description: "Create a relation between a course and an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 30,
    name: "removeCourseUser",
    label: "Remover Relação de Curso e Usuário",
    description: "Remove a relation between a course and an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 31,
    name: "createClass",
    label: "Criar Turmas",
    description: "Create class",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 32,
    name: "removeClass",
    label: "Remover Turmas",
    description: "Remove class",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 33,
    name: "updateClass",
    label: "Atualizar Turmas",
    description: "Update class attributes values",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 34,
    name: "listClasses",
    label: "Listar Turmas",
    description: "Search classes by",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 35,
    name: "listClassUsers",
    label: "Listar Turmas do Usuário",
    description: "List classes associate to users",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 36,
    name: "createClassUser",
    label: "Criar Relação de Turmas do Usuário",
    description: "Create a relation between a class and an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 37,
    name: "removeClassUser",
    label: "Remover Relação de Turmas do Usuário",
    description: "Remove a relation between a class and an user",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 38,
    name: "listProgresses",
    label: "Listar progresso de usuários",
    description: "List users progress",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 39,
    name: "createProgress",
    label: "Criar progresso de usuários",
    description: "Create user progress",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 40,
    name: "removeProgress",
    label: "Remover progresso de usuários",
    description: "Remove user progress",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 41,
    name: "updateProgress",
    label: "Atualizar progresso de usuários",
    description: "Update progress attributes values",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  },
  {
    id: 42,
    name: "dashboard",
    label: "Acessar dashboard",
    description:
      "Artificial scope created in front-end to grant access to the dashboard",
    createdAt: "2020-07-01T06:10:28.000Z",
    updatedAt: "2020-07-01T06:10:28.000Z"
  }
]

export default scopesList
