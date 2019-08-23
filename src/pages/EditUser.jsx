import React from "react";

// reactstrap components
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class EditUser extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0 text-uppercase">editar usuário</h3>
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
                            <Label
                              className="form-control-label"
                              for="input-first-name"
                            >
                              Nome
                            </Label>
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
                            <Label
                              for="input-last-name"
                              className="form-control-label"
                            >
                              Sobrenome
                            </Label>
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
                            <Label
                              for="input-email"
                              className="form-control-label"
                            >
                              E-mail
                            </Label>
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
                            <Label
                              for="input-cpf"
                              className="form-control-label"
                            >
                              CPF
                            </Label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue="999.999.999-99"
                              id="input-cpf"
                              placeholder="CPF"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Label
                              for="input-matriculation"
                              className="form-control-label"
                            >
                              Matrícula
                            </Label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="9999"
                              id="input-matriculation"
                              placeholder="Matrícula"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Label
                              for="select-scope"
                              className="form-control-label"
                            >
                              Permissão
                            </Label>
                            <Input
                              disabled
                              type="select"
                              name="select"
                              id="select-scope"
                            >
                              <option>Administrador</option>
                              <option>Aluno</option>
                              <option>Professor</option>
                            </Input>
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
                        <Col md="8">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              for="input-address"
                            >
                              Endereço
                            </Label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Rua Cap. Franklin de Castro, 1832"
                              id="input-address"
                              placeholder="Endereço"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              for="input-complement"
                            >
                              Complemento
                            </Label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Em frente ao Posto 2000"
                              id="input-complement"
                              placeholder="Complemento"
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

export default EditUser;
