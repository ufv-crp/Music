import React from "react";

// reactstrap components
import {
  UncontrolledTooltip,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  Modal,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Badge
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const LIST_USERS = gql`
  query ListUsers {
    listUsers(all: true) {
      id
      email
      password
      cpf
      matriculation
      firstName
      secondName
      createdAt
      updatedAt
      creator {
        id
        email
        matriculation
      }
    }
  }
`;

class Users extends React.Component {
  state = {
    notificationModal: false,
    userSelected: {}
  };

  toggleModal = (state, data) => {
    if (data) this.setState({ userSelected: data });
    this.setState({
      [state]: !this.state[state]
    });
  };

  renderTableData() {
    const { users } = this.props;
    return users.map((user, index) => {
      const { id, firstName, secondName, email, creator, matriculation } = user; // destructuring
      return (
        <tr key={id}>
          <td className="mb-0 text-sm">
            {firstName} {secondName}
          </td>

          <td className="mb-0 text-sm">{email}</td>
          <td className="mb-0 text-sm">
            {matriculation ? (
              matriculation
            ) : (
              <Badge color="danger" pill>
                não cadastrado
              </Badge>
            )}
          </td>
          <td className="mb-0 text-sm">{creator.email}</td>

          <td className="text-center">
            <Button
              size="sm"
              color="primary"
              data-placement="top"
              id="tooltip-info"
            >
              <i className="fas fa-info-circle" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target="tooltip-info"
            >
              Mais Info.
            </UncontrolledTooltip>
            <Button
              size="sm"
              color="default"
              data-placement="top"
              id="tooltip-edit"
            >
              <i className="fas fa-edit" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target="tooltip-edit"
            >
              Editar
            </UncontrolledTooltip>
            <Button
              size="sm"
              color="danger"
              data-placement="top"
              id="tooltip-delete"
              onClick={() => this.toggleModal("notificationModal", user)}
            >
              <i className="fas fa-trash" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target="tooltip-delete"
            >
              Remover
            </UncontrolledTooltip>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { users } = this.props;
    return (
      <>
        {<Header />}
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Usuários ({users.length})</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Matrícula</th>
                      <th scope="col">Registrado por</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>{this.renderTableData()}</tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Anterior</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Próximo</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Delete Modal */}
          <Modal
            className="modal-dialog-centered modal-danger"
            contentClassName="bg-gradient-danger"
            isOpen={this.state.notificationModal}
            toggle={() => this.toggleModal("notificationModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-notification">
                Remover usuário
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("notificationModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="py-3 text-center">
                <i className="ni ni-bell-55 ni-3x" />
                <h4 className="heading mt-4">
                  Você está removendo um usuário!
                </h4>
                <p>Usuário: {this.state.userSelected.firstName}</p>
              </div>
            </div>
            <div className="modal-footer">
              <Button className="btn-white" color="default" type="button">
                Remover
              </Button>
              <Button
                className="text-white ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("notificationModal")}
              >
                Cancelar
              </Button>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

const ListUsersQuery = () => {
  return (
    <Query query={LIST_USERS}>
      {({ loading, error, data, client }) => {
        if (loading) return "Carregando...";
        if (error) return `Erro! ${error.message}`;
        return <Users client={client} users={data.listUsers} />;
      }}
    </Query>
  );
};

export default ListUsersQuery;
