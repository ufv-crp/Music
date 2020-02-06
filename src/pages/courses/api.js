const listAllCourses = `
    query ListCourses($private: Boolean!) {
        listCourses(private: $private) {
            id
            title
            description
            start
            end
            creator
            private
            createdAt
            updatedAt
        }
    }
`;

const searchCourseCreator = `
	query SearchUser($id: Int!) {
		searchUser(id: $id) {
			firstName
			secondName
		}
	}
`;

const updateCourseById = `
    mutation UpdateCourse($params: CourseUpdate!) {
        updateCourse(params: $params) {
            id
            title
            description
            start
            end
            creator
            private
            createdAt
            updatedAt
        }
  }
`;

const removeCourseById = `
    mutation RemoveCourse($id: Int!) {
        removeCourse(id: $id)
    }
`;

const createCourse = `
    mutation CreateCourse($params: CourseInput!) {
        createCourse(params: $params) {
            id
            title
            description
            start
            end
            creator
            private
            createdAt
            updatedAt
        }
  }
`;

export {
  listAllCourses,
  updateCourseById,
  removeCourseById,
  createCourse,
  searchCourseCreator
};
