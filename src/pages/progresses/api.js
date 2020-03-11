const listClasses = `
	query ListClasses($params: ClassSearch!) {
		listClasses(params: $params){
			id
			vacancies
			instructor
			room
			shift
			courseId
			time
		}
	}
`;

const listAllCourses = `
    query ListCourses($private: Boolean!) {
        listCourses(private: $private) {
            id
            title
            start
            end
			private
			creator
        }
    }
`;

const searchClassInstructor = `
	query SearchUser($id: Int) {
		searchUser(id: $id) {
			firstName
			secondName
		}
	}
`;

const listAllClassUsers = `
	query ListClassUsers($classId: Int!) {
		listClassUsers(classId: $classId){
			id
			userId
		}
	}
`;

const searchClassUser = `
	query SearchUser($id: Int) {
		searchUser(id: $id) {
			id
			firstName
			secondName
			matriculation
		}
	}
`;

const listProgresses = `
	query ListProgresses($params: ProgressSearch!) {
		listProgresses(params: $params) {
			id
			attendance
			grade
		}
	}
`;

const createProgress = `
	mutation CreateProgress($params: ProgressInput!) {
		createProgress(params: $params) {
			id
			attendance
			grade
			classUserId
		}
	}
`;

const updateProgress = `
	mutation UpdateProgress($params: ProgressUpdateInput!) {
		updateProgress(params: $params) {
			id
			attendance
			grade
			classUserId
		}
	}
`;

const removeProgress = `
	mutation RemoveProgress($id: Int!) {
		removeProgress(id: $id)
	}
`;

export {
  listClasses,
  listAllCourses,
  searchClassInstructor,
  listAllClassUsers,
  searchClassUser,
  listProgresses,
  createProgress,
  updateProgress,
  removeProgress
};
