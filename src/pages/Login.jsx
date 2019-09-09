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

import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      firstName
      token
      tokenExpiration
      scopes
    }
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "password",
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false,
      formValid: false,
      errorMsg: {}
    };
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  validateForm = () => {
    const { emailValid, passwordValid } = this.state;
    this.setState({
      formValid: emailValid && passwordValid
    });
  };

  updateEmail = email => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = "Insira um e-mail válido!";
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = password => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 characters

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Senha deve conter pelo menos 6 caracteres";
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  async handleSubmit(client) {
    try {
      const { email, password } = this.state;
      const { history } = this.props;
      const {
        data: { login }
      } = await client.query({
        query: LOGIN,
        variables: {
          email: email,
          password: password
        }
      });
      if (login) {
        console.log(login);
        localStorage.setItem(process.env.REACT_APP_TOKEN, login.token);
        history.push("/general/dashboard");
      }
    } catch (err) {
      // disparar toast
      console.log(err);
    }
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <>
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-5">
                    <h2>Autenticação</h2>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
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
                          onChange={e => this.updatePassword(e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            className="toggle-password"
                            onClick={e => this.showHide(e)}
                          >
                            {this.state.type === "input" ? (
                              <i className="fas fa-eye" />
                            ) : (
                              <i className="fas fa-eye-slash" />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        disabled={!this.state.formValid}
                        className="my-4"
                        color="default"
                        onClick={() => this.handleSubmit(client)}
                      >
                        Entrar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="12">
                  <Link className="text-light" to="/auth/forgot">
                    <small>Esqueceu a senha?</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </ApolloConsumer>
    );
  }
}

export default Login;
