import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "password",
      password: "",
      confirmPassword: "",
      passMatch: {
        text: "",
        status: 0
      }
    };
    this.passwordMatcher = this.passwordMatcher.bind(this);
    this.showHide = this.showHide.bind(this);
  }

  passwordMatcher2 = e => {
    this.setState({ password: e.target.value });
    if (this.state.confirmPassword === e.target.value) {
      this.setState({
        passMatch: {
          text: "Senhas conferem!",
          status: 1
        }
      });
    } else {
      this.setState({
        passMatch: {
          text: "Senhas não conferem!",
          status: 2
        }
      });
    }
  }

  passwordMatcher = e => {
    this.setState({ confirmPassword: e.target.value });
    if (this.state.password === e.target.value) {
      this.setState({
        passMatch: {
          text: "Senhas conferem!",
          status: 1
        }
      });
    } else {
      this.setState({
        passMatch: {
          text: "Senhas não conferem!",
          status: 2
        }
      });
    }
  };

  handleSubmit = () => {
    // Form validation
    // API Call
  };

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h2>Criar nova conta</h2>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nome" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Sobrenome" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="CPF" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Matrícula" type="number" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="E-mail" type="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type={this.state.type}
                      value={this.state.password}
                      onChange={this.passwordMatcher2}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        className="toggle-password"
                        onClick={this.showHide}
                      >
                        {this.state.type === "input" ? (
                          <i className="far fa-eye" />
                        ) : (
                          <i className="far fa-eye-slash" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      {this.state.passMatch.status === 0 && (
                      <i className="ni ni-check-bold" />
                    )}
                    {this.state.passMatch.status === 1 &&
                     <i className="ni ni-check-bold text-success" />
                    }
                    {this.state.passMatch.status === 2 &&
                     <i className="ni ni-check-bold text-danger" /> 
                      }
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirmar Senha"
                      type="password"
                      value={this.state.confirmPassword}
                      onChange={this.passwordMatcher}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    {this.state.passMatch.status === 1 &&
                  <span className="text-success font-weight-700">{this.state.passMatch.text}</span>
                    }
                    {this.state.passMatch.status === 2 &&
                  <span className="text-danger font-weight-700">{this.state.passMatch.text}</span>
                  }
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          Concordo com a{" "}
                          <a className="text-default font-weight-bold" href="#test">
                            Política de Privacidade
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="default" type="button">
                    Criar Conta
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link className="text-light" to="/auth/forgot">
                <small>Esqueceu a senha?</small>
              </Link>
            </Col>
            <Col className="text-right" xs="6">
              <Link className="text-light" to="/auth/login">
                <small>Fazer Login</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Register;
