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

class ForgotPassword extends React.Component {
  state = {
    email: "",
    emailValid: false,
    formValid: false,
    errorMsg: {}
  };

  // Form Validation

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

  validateForm = () => {
    const { emailValid } = this.state;
    this.setState({
      formValid: emailValid
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
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-5">
                <h2>Recuperar Senha</h2>
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
                <div className="text-center">
                  <Button
                    disabled={!this.state.formValid}
                    onClick={this.handleSubmit}
                    className="my-4"
                    color="default"
                    type="button"
                  >
                    Enviar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="12">
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

export default ForgotPassword;
