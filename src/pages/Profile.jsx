import React from "react";

// reactstrap components
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class Profile extends React.Component {
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src="http://via.placeholder.com/800x800"
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                {/* Card Right */}
                <CardBody className="pt-5 pt-md-4 mt-5">
                  <div className="text-center pt-4 mt-5">
                    <h3>
                      Jessica Jones
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni ni-badge mr-1" />
                      9999
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni ni-pin-3 mr-1" />
                      Rio Paranaíba, MG
                    </div>
                    <div className="h4 mt-4">
                      <i className="ni ni-briefcase-24 mr-1" />
                      Administrador
                    </div>
                    <div>
                      <i className="ni ni-hat-3 mr-1" />
                      Universidade Federal de Viçosa
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Minha Conta</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informações do usuário
                      <i className="ni ni-single-02 ml-1" />
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nome
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Lucky"
                              id="input-first-name"
                              placeholder="Nome"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Sobrenome
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="input-last-name"
                              placeholder="Sobrenome"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              E-mail
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="email@exemplo.com"
                              id="input-email"
                              placeholder="email@exemplo.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              CPF
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue="999.999.999-99"
                              id="input-first-name"
                              placeholder="CPF"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Informações de contato
                      <i className="ni ni-square-pin ml-1" />
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Endereço
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Rua Cap. Franklin de Castro, 1832"
                              id="input-address"
                              placeholder="Endereço"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Cidade
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Rio Paranaíba"
                              id="input-city"
                              placeholder="Cidade"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Estado
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Minas Gerais"
                              id="input-country"
                              placeholder="Estado"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              CEP
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="38810-000"
                              id="input-postal-code"
                              placeholder="CEP"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        color="default"
                        className="float-right"
                        onClick={e => e.preventDefault()}
                      >
                        Editar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
