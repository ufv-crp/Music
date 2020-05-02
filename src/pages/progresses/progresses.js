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
        title="Alunos Matriculados"
        icons={icons}
        localization={{
          body: {
            emptyDataSourceMessage: "Não há registros",
            filterRow: {
              filterTooltip: "Filtrar"
            },
            editTooltip: "Editar",
            deleteTooltip: "Excluir",
            editRow: {
              cancelTooltip: "Cancelar",
              saveTooltip: "Salvar",
              deleteText: "Tem certeza que deseja excluir?"
            }
          },
          header: {
            actions: "Ações",
            export: "Exportar"
          },
          toolbar: {
            exportTitle: "Exportar",
            exportName: "Exportar como CSV"
          }
        }}
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
            title: "Nome",
            field: "name",
            type: "string",
            editable: "never"
          },
          {
            title: "Matrícula",
            field: "matriculation",
            type: "string",
            editable: "never"
          },
          {
            title: "Faltas",
            field: "attendance",
            type: "numeric"
          },
          {
            title: "Nota",
            field: "grade",
            type: "numeric"
          }
        ]}
        options={{
          actionsColumnIndex: -1,
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

                enqueueSnackbar("Informações atualizadas", {
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
                  "Erro ao criar progresso, Verifique se todos os campos estão preenchidos",
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
              // eslint-disable-next-line
              const progressUpdated = await client.request(updateProgress, {
                params: {
                  id: newData.id,
                  attendance: parseInt(newData.attendance),
                  grade: parseFloat(newData.grade),
                  classUserId: newData.classUserId
                }
              })

              enqueueSnackbar("Progresso atualizado", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              })
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

              enqueueSnackbar("Progresso removido", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              })
            } catch (error) {
              console.log(error)

              enqueueSnackbar("Erro durante a exclusão do progresso", {
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
        title={`Turmas de ${rowDataCourse.title}`}
        icons={icons}
        localization={{
          body: {
            emptyDataSourceMessage: "Não há registros",
            filterRow: {
              filterTooltip: "Filtrar"
            }
          },
          header: {
            actions: "Ações",
            export: "Exportar"
          },
          toolbar: {
            exportTitle: "Exportar",
            exportName: "Exportar como CSV"
          }
        }}
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
            title: "Vagas",
            field: "vacancies",
            type: "numeric",
            editable: "never"
          },
          { title: "Sala", field: "room", type: "string", editable: "never" },
          { title: "Turno", field: "shift", type: "string", editable: "never" },
          {
            title: "Professor",
            field: "instructor",
            type: "string",
            editable: "never"
          },
          {
            title: "Horário",
            field: "time",
            type: "time"
          }
        ]}
        options={{
          actionsColumnIndex: -1,
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
      title="Cursos"
      icons={icons}
      localization={{
        body: {
          emptyDataSourceMessage: "Não há registros",
          filterRow: {
            filterTooltip: "Filtrar"
          }
        },
        header: {
          actions: "Ações",
          export: "Exportar"
        },
        toolbar: {
          exportTitle: "Exportar",
          exportName: "Exportar como CSV"
        }
      }}
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
          title: "Nome",
          field: "title",
          type: "string",
          editable: "never"
        },
        {
          title: "Início",
          field: "start",
          type: "datetime",
          editable: "never"
        },
        { title: "Fim", field: "end", type: "datetime", editable: "never" },
        {
          title: "Privado",
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
        detailPanelColumnAlignment: "left",
        actionsColumnIndex: -1
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
