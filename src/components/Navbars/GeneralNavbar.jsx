import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Modal,
  Button
} from "reactstrap";

class GeneralNavbar extends React.Component {
  state = {
    defaultModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  handleLogout(e) {
    e.preventDefault();
    const { history } = this.props;
    localStorage.removeItem(process.env.REACT_APP_TOKEN);
    history.push("/auth/login");
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Pesquisar" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src="http://via.placeholder.com/800x800" />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Jessica Jones
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Menu</h6>
                  </DropdownItem>
                  <DropdownItem to="/general/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Perfil</span>
                  </DropdownItem>
                  <DropdownItem to="/general/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Suporte</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    style={{ cursor: "pointer" }}
                    onClick={() => this.toggleModal("notificationModal")}
                  >
                    <i className="ni ni-user-run" />
                    <span>Sair</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
        {/* Logout Modal*/}
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-info"
          isOpen={this.state.notificationModal}
          toggle={() => this.toggleModal("notificationModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-notification">
              Logout
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
              <i className="ni ni-user-run ni-3x" />
              <h4 className="heading mt-4">Já vai?</h4>
              <p>Você realmente deseja sair?</p>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              className="btn-white"
              color="default"
              type="button"
              onClick={e => this.handleLogout(e)}
            >
              Sim, Sair
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
        {/* End Logout Modal*/}
      </>
    );
  }
}

export default GeneralNavbar;
