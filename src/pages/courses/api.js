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
        }
  	}
`;

const userCourse = `
	mutation CreateCourseUser($courseId: Int!, $userId: Int!) {
		createCourseUser(courseId: $courseId, userId: $userId)
 	}
`;

export {
  listAllCourses,
  updateCourseById,
  removeCourseById,
  createCourse,
  searchCourseCreator,
  userCourse
};
