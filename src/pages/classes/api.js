const createClass = `
	mutation CreateClass($params: ClassInput!) {
		createClass(params: $params) {
			id
			vacancies
			instructor
			room
			shift
			courseId
			time
		}
	}
`

const updateClass = `
	mutation UpdateClass($params: ClassUpdateInput!) {
		updateClass(params: $params) {
			id
			vacancies
			instructor
			room
			shift
			courseId
			time
		}
	}
`

const removeClass = `
	mutation RemoveClass($id: Int!) {
		removeClass(id: $id)
	}
`

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
`

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
`

const searchClassInstructor = `
	query SearchUser($id: Int!) {
		searchUser(id: $id) {
			firstName
			secondName
		}
	}
`

const createClassUser = `
	mutation CreateClassUser($classId: Int!, $userId: Int!) {
		createClassUser(classId: $classId, userId: $userId)
	}
`

export {
  createClass,
  updateClass,
  removeClass,
  listClasses,
  listAllCourses,
  searchClassInstructor,
  createClassUser
}
