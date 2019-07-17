import React from "react";
import { Link } from "react-router-dom";
import { cpfMask, emailMask } from "../../variables/mask";

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
  state = {
    firstName: "",
    firstNameValid: false,
    secondName: "",
    secondNameValid: false,
    cpf: "",
    cpfValid: false,
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    passwordConfirm: "",
    passwordConfirmValid: false,
    matriculation: "",
    matriculationValid: false,
    formValid: false,
    errorMsg: {},
    passMatch: {
      text: "",
      status: 0
    },
    type: "password"
  };

  // Password Toggle

  togglePassword(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  // ./Password Toggle

  // Form Validation

  updateFirstName = firstName => {
    this.setState({ firstName }, this.validateFirstName);
  };

  validateFirstName = () => {
    const { firstName } = this.state;
    let firstNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // can't be blank/empty

    if (firstName.length === 0) {
      firstNameValid = false;
      errorMsg.firstName = "Nome não pode ser vazio!";
    }

    this.setState({ firstNameValid, errorMsg }, this.validateForm);
  };

  updateSecondName = secondName => {
    this.setState({ secondName }, this.validateSecondName);
  };

  validateSecondName = () => {
    const { secondName } = this.state;
    let secondNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // can't be blank/empty

    if (secondName.length === 0) {
      secondNameValid = false;
      errorMsg.secondName = "Sobrenome não pode ser vazio!";
    }

    this.setState({ secondNameValid, errorMsg }, this.validateForm);
  };

  updateCPF = cpf => {
    this.setState({ cpf }, this.validateCPF);
  };

  validateCPF = () => {
    const { cpf } = this.state;
    let cpfValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (cpfMask(cpf).length > 0 && cpfMask(cpf).length < 14) {
      cpfValid = false;
      errorMsg.cpf = "Insira um CPF válido!";
    } else if (cpfMask(cpf).length === 0) {
      cpfValid = false;
      errorMsg.cpf = "CPF não pode ser vazio!";
    }

    this.setState({ cpfValid, errorMsg }, this.validateForm);
  };

  updateMatriculation = matriculation => {
    this.setState({ matriculation }, this.validateMatriculation);
  };

  validateMatriculation = () => {
    const { matriculation } = this.state;
    let matriculationValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (matriculation.length === 0) {
      matriculationValid = false;
      errorMsg.matriculation = "Matrícula não pode ser vazia!";
    }

    this.setState({ matriculationValid, errorMsg }, this.validateForm);
  };

  updateEmail = email => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (emailMask(email)) {
      emailValid = false;
      errorMsg.email = "Insira um e-mail válido!";
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = password => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password, passwordConfirm } = this.state;
    let passwordValid = true;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 characters

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Senha deve conter pelo menos 6 caracteres";
    }
    if (passwordConfirm !== password) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Senhas não são iguais!";
    }

    this.setState(
      { passwordConfirmValid, passwordValid, errorMsg },
      this.validateForm
    );
  };

  updateConfirmPassword = passwordConfirm => {
    this.setState({ passwordConfirm }, this.validatePasswordConfirm);
  };

  validatePasswordConfirm = () => {
    const { passwordConfirm, password } = this.state;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== passwordConfirm) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Senhas não são iguais!";
    }

    this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
  };

  validateForm = () => {
    const {
      emailValid,
      passwordValid,
      passwordConfirmValid,
      cpfValid,
      firstNameValid,
      secondNameValid,
      matriculationValid
    } = this.state;
    this.setState({
      formValid:
        emailValid &&
        passwordValid &&
        passwordConfirmValid &&
        cpfValid &&
        firstNameValid &&
        secondNameValid &&
        matriculationValid
    });
  };

  // Submit Form

  handleSubmit = () => {
    // API Call
    alert("okay!");
  };

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
                        <i className="fas fa-signature" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Nome"
                      type="text"
                      value={this.state.firstName}
                      onChange={e => this.updateFirstName(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.firstNameValid ? (
                          <i className="ni ni-check-bold text-success" />
                        ) : (
                          <i className="ni ni-check-bold text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted font-bold">
                    <small>
                      {!this.state.firstNameValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.firstName}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Sobrenome"
                      type="text"
                      value={this.state.secondName}
                      onChange={e => this.updateSecondName(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.secondNameValid ? (
                          <i className="ni ni-check-bold text-success" />
                        ) : (
                          <i className="ni ni-check-bold text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted font-bold">
                    <small>
                      {!this.state.secondNameValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.secondName}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-id-card-alt" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="CPF"
                      type="text"
                      value={this.state.cpf}
                      maxLength={11}
                      onChange={e => this.updateCPF(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.cpfValid ? (
                          <i className="ni ni-check-bold text-success" />
                        ) : (
                          <i className="ni ni-check-bold text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted font-bold">
                    <small>
                      {!this.state.cpfValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.cpf}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Matrícula"
                      type="text"
                      maxLength={4}
                      value={this.state.matriculation}
                      onChange={e => this.updateMatriculation(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.matriculationValid ? (
                          <i className="ni ni-check-bold text-success" />
                        ) : (
                          <i className="ni ni-check-bold text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted font-bold">
                    <small>
                      {!this.state.matriculationValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.matriculation}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="E-mail"
                      type="email"
                      value={this.state.email}
                      onChange={e => this.updateEmail(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.emailValid ? (
                          <i className="ni ni-check-bold text-success" />
                        ) : (
                          <i className="ni ni-check-bold text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted text-bold">
                    <small>
                      {!this.state.emailValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.email}
                        </span>
                      )}
                    </small>
                  </div>
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
                      onChange={e => this.updatePassword(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        className="toggle-password"
                        onClick={e => this.togglePassword(e)}
                      >
                        {this.state.type === "input" ? (
                          <i className="far fa-eye" />
                        ) : (
                          <i className="far fa-eye-slash" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted text-bold">
                    <small>
                      {!this.state.passwordValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.password}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-check-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirmar Senha"
                      type="password"
                      value={this.state.confirmPassword}
                      onChange={e => this.updateConfirmPassword(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {this.state.passwordConfirmValid ? (
                          <i className="fas fa-check-double text-success" />
                        ) : (
                          <i className="fas fa-check-double text-danger" />
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div className="text-muted text-bold">
                    <small>
                      {!this.state.passwordConfirmValid && (
                        <span className="text-danger font-weight-700">
                          {this.state.errorMsg.passwordConfirm}
                        </span>
                      )}
                    </small>
                  </div>
                </FormGroup>
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
                          <a
                            className="text-default font-weight-bold"
                            href="#test"
                          >
                            Política de Privacidade
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    disabled={!this.state.formValid}
                    onClick={this.handleSubmit}
                    className="mt-4"
                    color="default"
                    type="button"
                  >
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
