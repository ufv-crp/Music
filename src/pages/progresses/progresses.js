import React, { useContext } from "react"

import MaterialTable from "material-table"

import { Box, makeStyles } from "@material-ui/core"

import { createAuthenticatedClient } from "../../authentication"

import { AuthenticationContext } from "../../states"

import {
  listAllCourses,
  listClasses,
  searchClassInstructor,
  listAllClassUsers,
  searchClassUser,
  listProgresses,
  createProgress,
  updateProgress,
  removeProgress
} from "./api"

import { useSnackbar } from "notistack"

import icons from "../../components/materialTable/icons"

const useStyles = makeStyles((theme) => ({
  classesTable: {
    padding: theme.spacing(2),
    "& > *": {
      border: "0px",
      boxShadow: "0px 0px"
    },
    background: theme.palette.background.default,
    border: `6px solid ${theme.palette.white}`
  }
}))

const ListUsers = ({ client, rowDataClass }) => {
  const { enqueueSnackbar } = useSnackbar()

  const { authentication } = useContext(AuthenticationContext)

  const classes = useStyles()

  return (
    <Box className={classes.classesTable}>
      <MaterialTable
        title="Users"
        icons={icons}
        data={async () => {
          let classUsers

          try {
            classUsers = await client.request(listAllClassUsers, {
              classId: rowDataClass.id
            })
          } catch (error) {
            console.log(error)

            classUsers = { listClassUsers: [] }
          }

          const users = classUsers.listClassUsers
            .map((user) => {
              return client
                .request(searchClassUser, { id: user.userId })
                .then((response) => ({
                  ...response.searchUser,
                  classUserId: user.id
                }))
                .catch((error) => {
                  console.log(error)

                  return null
                })
            })
            .filter((user) => (user ? true : false))

          let usersData

          try {
            usersData = await Promise.all(users)

            usersData = usersData.map((userData, index) => {
              return {
                ...userData,
                name: `${userData.firstName || ""} ${userData.secondName || ""}`
              }
            })
          } catch (error) {
            console.log(error)

            usersData = []
          }

          const usersProgresses = usersData.map((user) => {
            return client
              .request(listProgresses, {
                params: { classUserId: user.classUserId }
              })
              .then((response) => {
                return Object.assign(user, ...response.listProgresses)
              })
              .catch((error) => user)
          })

          let usersProgressesData

          try {
            usersProgressesData = await Promise.all(usersProgresses)
          } catch (error) {
            console.log(error)

            usersProgressesData = []
          }

          return new Promise((resolve, reject) => {
            return resolve({
              data: usersProgressesData,
              page: 0,
              totalCount: usersProgressesData.length
            })
          })
        }}
        columns={[
          {
            title: "Name",
            field: "name",
            type: "string",
            editable: "never"
          },
          {
            title: "Matriculation",
            field: "matriculation",
            type: "string",
            editable: "never"
          },
          {
            title: "Attendance",
            field: "attendance",
            type: "numeric"
          },
          {
            title: "Grade",
            field: "grade",
            type: "numeric"
          }
        ]}
        options={{
          selection: false,
          search: false,
          showTitle: true,
          toolbar: true,
          columnsButton: false,
          exportButton: true,
          paging: false,
          detailPanelColumnAlignment: "left"
        }}
        editable={{
          isEditable: (rowData) => {
            return authentication.userId === rowDataClass.instructorId
          },
          isDeletable: (rowData) => {
            return authentication.userId === rowDataClass.instructorId
          },
          onRowUpdate: async (newData, oldData) => {
            if (!oldData.attendance && !oldData.grade) {
              try {
                // eslint-disable-next-line
                const progressCreated = await client.request(createProgress, {
                  params: {
                    attendance: parseInt(newData.attendance),
                    grade: parseFloat(newData.grade),
                    classUserId: newData.classUserId
                  }
                })

                enqueueSnackbar("Progress created", {
                  variant: "success",
                  autoHideDuration: 5000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })
              } catch (error) {
                console.log(error)

                enqueueSnackbar(
                  "Error on progress create, check if all fields are filled",
                  {
                    variant: "error",
                    autoHideDuration: 8000,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right"
                    }
                  }
                )
              }
            } else {
              try {
                // eslint-disable-next-line
                const progressUpdated = await client.request(updateProgress, {
                  params: {
                    id: newData.id,
                    attendance: parseInt(newData.attendance),
                    grade: parseFloat(newData.grade),
                    classUserId: newData.classUserId
                  }
                })

                enqueueSnackbar("Progress updated", {
                  variant: "success",
                  autoHideDuration: 5000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })
              } catch (error) {
                console.log(error)

                enqueueSnackbar("Error on progress update", {
                  variant: "error",
                  autoHideDuration: 8000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })
              }
            }

            return new Promise((resolve, reject) => {
              resolve()
            })
          },
          onRowDelete: async (oldData) => {
            try {
              // eslint-disable-next-line
              const progressRemoved = await client.request(removeProgress, {
                id: oldData.id
              })

              enqueueSnackbar("Progress removed", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              })
            } catch (error) {
              console.log(error)

              enqueueSnackbar("Error on progress remove", {
                variant: "error",
                autoHideDuration: 8000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              })
            }

            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        }}
      />
    </Box>
  )
}

const ListClasses = ({ client, rowDataCourse }) => {
  const classes = useStyles()

  return (
    <Box className={classes.classesTable}>
      <MaterialTable
        title="Classes"
        icons={icons}
        data={async () => {
          let _listClassesRaw

          try {
            _listClassesRaw = await client.request(listClasses, {
              params: { courseId: rowDataCourse.id }
            })
          } catch (error) {
            console.log(error)

            _listClassesRaw = { listClasses: [] }
          }

          let _listClasses

          try {
            let classesInstructors = _listClassesRaw.listClasses.map(
              ({ instructor, ...rest }) => {
                return client.request(searchClassInstructor, {
                  id: instructor
                })
              }
            )

            classesInstructors = await Promise.all(classesInstructors)

            classesInstructors = classesInstructors.map((instructorData) => {
              return `${instructorData.searchUser.firstName} ${instructorData.searchUser.secondName}`
            })

            _listClasses = _listClassesRaw.listClasses.map(
              ({ instructor, ...rest }, index) => {
                return {
                  ...rest,
                  instructor: classesInstructors[index],
                  instructorId: instructor
                }
              }
            )
          } catch (error) {
            console.log(error)

            _listClasses = []
          }

          return new Promise((resolve, reject) => {
            return resolve({
              data: _listClasses,
              page: 0,
              totalCount: _listClasses.length
            })
          })
        }}
        columns={[
          {
            title: "Vacancies",
            field: "vacancies",
            type: "numeric",
            editable: "never"
          },
          { title: "Room", field: "room", type: "string", editable: "never" },
          { title: "Shift", field: "shift", type: "string", editable: "never" },
          {
            title: "Instructor",
            field: "instructor",
            type: "string",
            editable: "never"
          },
          {
            title: "Time",
            field: "time",
            type: "time"
          }
        ]}
        options={{
          selection: false,
          search: false,
          showTitle: true,
          toolbar: true,
          columnsButton: false,
          exportButton: true,
          paging: false,
          detailPanelColumnAlignment: "left"
        }}
        detailPanel={(rowData) => {
          return <ListUsers client={client} rowDataClass={rowData} />
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </Box>
  )
}

const ListCourses = ({ client }) => {
  return (
    <MaterialTable
      title="Courses"
      icons={icons}
      data={async (query) => {
        let filters = query.filters.map((item) => {
          return {
            [item.column.field]: {
              type: item.column.type,
              value: item.value
            }
          }
        })

        filters = Object.assign(
          {
            private: {
              type: "boolean",
              value: "unchecked"
            }
          },
          ...filters
        )

        let courses

        try {
          courses = await client.request(listAllCourses, {
            private: filters.private.value === "checked" ? true : false
          })
        } catch (error) {
          console.log(error)

          courses = { listCourses: [] }
        }

        const coursesFiltered = courses.listCourses
          .filter((course) => {
            if (filters.title)
              return course.title
                .toLowerCase()
                .includes(filters.title.value.toLowerCase())

            return true
          })
          .filter((course) => {
            if (filters.start)
              return (
                new Date(course.start).toLocaleDateString() ===
                new Date(filters.start.value).toLocaleDateString()
              )

            return true
          })
          .filter((course) => {
            if (filters.end)
              return (
                new Date(course.end).toLocaleDateString() ===
                new Date(filters.end.value).toLocaleDateString()
              )

            return true
          })

        return new Promise((resolve, reject) => {
          resolve({
            data: coursesFiltered,
            page: 0,
            totalCount: coursesFiltered.length
          })
        })
      }}
      columns={[
        {
          title: "Title",
          field: "title",
          type: "string",
          editable: "never"
        },
        { title: "Start", field: "start", type: "datetime", editable: "never" },
        { title: "End", field: "end", type: "datetime", editable: "never" },
        {
          title: "Private",
          field: "private",
          type: "boolean",
          editable: "never"
        }
      ]}
      options={{
        selection: false,
        search: false,
        exportButton: true,
        grouping: false,
        paging: false,
        filtering: true,
        debounceInterval: 50,
        detailPanelColumnAlignment: "left"
      }}
      detailPanel={(rowData) => {
        return <ListClasses client={client} rowDataCourse={rowData} />
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  )
}

const Progresses = () => {
  const client = createAuthenticatedClient()

  return (
    <>
      <ListCourses client={client} />
    </>
  )
}

export default Progresses
