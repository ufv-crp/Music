const listUsersCounter = `
	query ListUsers($all: Boolean) {
		listUsers(all: $all) {
			id
		}
	}
`

const listCoursesCounter = `
	query ListCourses($private: Boolean!) {
		listCourses(private: $private) {
			id
		}
	}
`

const listClassesCounter = `
	query ListClasses($params: ClassSearch!) {
		listClasses(params: $params){
			id
		}
	}
`

const listCoursesUsers = `
	query ListCourseUsers($userId: Int) {
		listCourseUsers(userId: $userId) {
			userId
			courseId
		}
	}
`

const searchCourse = `
	query SearchCourse($params: CourseSearch!) {
		searchCourses(params: $params) {
			id
			title
			start
			end
			private
		}
	}
`

const listClassUsers = `
	query ListClassUsers($userId: Int) {
		listClassUsers(userId: $userId){
			id
			classId
			userId
		}
	}
`

const classSearch = `
	query ListClasses($params: ClassSearch!) {
		listClasses(params: $params){
			id
			vacancies
			instructor
			room
			shift
		}
	}
`

const searchClassInstructor = `
	query SearchUser($id: Int!) {
		searchUser(id: $id) {
			firstName
			secondName
		}
	}
`

const listCoursesCalendar = `
	query ListUsers($start: String) {
		listUsers(start: $start) {
			id
			createdAt
		}
	}
`

export {
  listUsersCounter,
  listCoursesCounter,
  listClassesCounter,
  listCoursesUsers,
  searchCourse,
  listClassUsers,
  classSearch,
  searchClassInstructor,
  listCoursesCalendar
}
