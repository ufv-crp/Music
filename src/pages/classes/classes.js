import React, { useContext } from "react";

import MaterialTable from "material-table";

import { createAuthenticatedClient } from "../../authentication";

import { AuthenticationContext } from "../../states";

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

const ListClasses = ({ client, rowDataCourse }) => {
  const { authentication } = useContext(AuthenticationContext);

  const { enqueueSnackbar } = useSnackbar();
  
  return (
    <MaterialTable
      title="Classes"
      icons={icons}
      data={async () => {
        let _listClasses;

        try {
          const _listClassesRaw = await client.request(listClasses, {
            params: { courseId: rowDataCourse.id }
          });

          let classesInstructors;

          classesInstructors = _listClassesRaw.listClasses.map(
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
        { title: "Vacancies", field: "vacancies", type: "numeric" },
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
              autoHideDuration: 5000
            });
          } catch (error) {
            console.log(error);

            enqueueSnackbar(
              "Error on class create, check if all fields are filled",
              {
                variant: "error",
                autoHideDuration: 8000
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
              autoHideDuration: 5000
            });
          } catch (error) {
            console.log(error);

            enqueueSnackbar(
              "Unable to associate the class and the user, contact an admin",
              {
                variant: "error",
                autoHideDuration: 8000
              }
            );
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
              autoHideDuration: 5000
            });
          } catch (error) {
            console.log(error);

            enqueueSnackbar("Error on class update", {
              variant: "error",
              autoHideDuration: 8000
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
              autoHideDuration: 5000
            });
          } catch (error) {
            console.log(error);

            enqueueSnackbar("Error on class remove", {
              variant: "error",
              autoHideDuration: 8000
            });
          }

          return new Promise((resolve, reject) => {
            resolve();
          });
        }
      }}
    />
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

        const courses = await client.request(listAllCourses, {
          private: filters.private.value === "checked" ? true : false
        });

        console.log(filters, courses);

        const coursesFiltered = courses.listCourses.filter(course => {
          if (filters.title) return course.title.includes(filters.title.value);

          if (filters.start)
            return (
              new Date(course.start).toLocaleDateString() ===
              new Date(filters.start.value).toLocaleDateString()
            );

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
