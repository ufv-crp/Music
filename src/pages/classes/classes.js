import React, { useContext } from "react";

import MaterialTable from "material-table";

import { createAuthenticatedClient } from "../../authentication";

import { AuthenticationContext } from "../../states";

import { Box, makeStyles } from "@material-ui/core";

import {
  listAllCourses,
  listClasses,
  searchClassInstructor,
  removeClass,
  updateClass,
  createClass,
  createClassUser
} from "./api";

import { useSnackbar } from "notistack";

import icons from "../../components/materialTable/icons";

const useStyles = makeStyles(theme => ({
  classesTable: {
    padding: theme.spacing(2),
    "& > *": {
      border: "0px",
      boxShadow: "0px 0px"
    },
	background: theme.palette.background.default,
	border: `6px solid ${theme.palette.white}`
  }
}));

const ListClasses = ({ client, rowDataCourse }) => {
  const { authentication } = useContext(AuthenticationContext);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box className={classes.classesTable}>
      <MaterialTable
        title="Classes"
        icons={icons}
        data={async () => {
          let _listClassesRaw;

          try {
            _listClassesRaw = await client.request(listClasses, {
              params: { courseId: rowDataCourse.id }
            });
          } catch (error) {
            console.log(error);

            _listClassesRaw = { listClasses: [] };
          }

          let _listClasses;

          try {
            let classesInstructors = _listClassesRaw.listClasses.map(
              ({ instructor, ...rest }) => {
                return client.request(searchClassInstructor, {
                  id: instructor
                });
              }
            );

            classesInstructors = await Promise.all(classesInstructors);

            classesInstructors = classesInstructors.map(instructorData => {
              return `${instructorData.searchUser.firstName} ${instructorData.searchUser.secondName}`;
            });

            _listClasses = _listClassesRaw.listClasses.map(
              ({ instructor, ...rest }, index) => {
                return {
                  ...rest,
                  instructor: classesInstructors[index],
                  instructorId: instructor
                };
              }
            );
          } catch (error) {
            console.log(error);

            _listClasses = [];
          }

          return new Promise((resolve, reject) => {
            return resolve({
              data: _listClasses,
              page: 0,
              totalCount: _listClasses.length
            });
          });
        }}
        columns={[
          {
            title: "Vacancies",
            field: "vacancies",
            type: "numeric"
          },
          { title: "Room", field: "room", type: "string" },
          { title: "Shift", field: "shift", type: "string" },
          {
            title: "Instructor",
            field: "instructor",
            type: "string",
            editable: "never"
          }
        ]}
        options={{
          selection: false,
          search: false,
          // header: false,
          showTitle: true,
          toolbar: true,
          columnsButton: false,
          exportButton: true,
          paging: false,
          detailPanelColumnAlignment: "left"
        }}
        editable={{
          isEditable: rowData => {
            return (
              rowData.instructorId === rowDataCourse.creator ||
              rowData.instructorId === authentication.userId
            );
          },
          isDeletable: rowData => {
            return (
              rowData.instructorId === rowDataCourse.creator ||
              rowData.instructorId === authentication.userId
            );
          },
          onRowAdd: async newData => {
            let classCreated;

            try {
              classCreated = await client.request(createClass, {
                params: {
                  ...newData,
                  vacancies: parseInt(newData.vacancies),
                  instructor: authentication.userId,
                  courseId: rowDataCourse.id
                }
              });

              enqueueSnackbar("Class created", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            } catch (error) {
              console.log(error);

              enqueueSnackbar(
                "Error on class create, check if all fields are filled",
                {
                  variant: "error",
                  autoHideDuration: 8000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                }
              );
            }

            try {
              // eslint-disable-next-line
              const classUserCreated = await client.request(createClassUser, {
                classId: classCreated.createClass.id,
                userId: authentication.userId
              });

              enqueueSnackbar("Class associated with the user", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            } catch (error) {
              console.log(error);

              enqueueSnackbar("Unable to associate the class and the user", {
                variant: "error",
                autoHideDuration: 8000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            }

            return new Promise((resolve, reject) => {
              resolve();
            });
          },
          onRowUpdate: async (newData, oldData) => {
            const changes = Object.keys(newData)
              .filter(key => {
                return newData[key] !== oldData[key] ? key : null;
              })
              .map(key => {
                let cache = { [key]: newData[key] };

                if (["vacancies"].includes(key))
                  cache = { [key]: parseInt(newData[key]) };

                return cache;
              });

            try {
              // eslint-disable-next-line
              const classUpdated = await client.request(updateClass, {
                params: Object.assign(...changes, { id: newData.id })
              });

              enqueueSnackbar("Class updated", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            } catch (error) {
              console.log(error);

              enqueueSnackbar("Error on class update", {
                variant: "error",
                autoHideDuration: 8000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            }

            return new Promise((resolve, reject) => {
              resolve();
            });
          },
          onRowDelete: async oldData => {
            try {
              // eslint-disable-next-line
              const classRemoved = await client.request(removeClass, {
                id: oldData.id
              });

              enqueueSnackbar("Class removed", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            } catch (error) {
              console.log(error);

              enqueueSnackbar("Error on class remove", {
                variant: "error",
                autoHideDuration: 8000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              });
            }

            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        }}
      />
    </Box>
  );
};

const ListCourses = ({ client }) => {
  return (
    <MaterialTable
      title="Courses"
      icons={icons}
      data={async query => {
        let filters = query.filters.map(item => {
          return {
            [item.column.field]: {
              type: item.column.type,
              value: item.value
            }
          };
        });

        filters = Object.assign(
          {
            private: {
              type: "boolean",
              value: "unchecked"
            }
          },
          ...filters
        );

        let courses;

        try {
          courses = await client.request(listAllCourses, {
            private: filters.private.value === "checked" ? true : false
          });
        } catch (error) {
          console.log(error);

          courses = { listCourses: [] };
        }

        const coursesFiltered = courses.listCourses
          .filter(course => {
            if (filters.title)
              return course.title
                .toLowerCase()
                .includes(filters.title.value.toLowerCase());

            return true;
          })
          .filter(course => {
            if (filters.start)
              return (
                new Date(course.start).toLocaleDateString() ===
                new Date(filters.start.value).toLocaleDateString()
              );

            return true;
          })
          .filter(course => {
            if (filters.end)
              return (
                new Date(course.end).toLocaleDateString() ===
                new Date(filters.end.value).toLocaleDateString()
              );

            return true;
          });

        return new Promise((resolve, reject) => {
          resolve({
            data: coursesFiltered,
            page: 0,
            totalCount: coursesFiltered.length
          });
        });
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
      detailPanel={rowData => {
        return <ListClasses client={client} rowDataCourse={rowData} />;
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
};

const Classes = () => {
  const client = createAuthenticatedClient();

  return (
    <>
      <ListCourses client={client} />
    </>
  );
};

export default Classes;
