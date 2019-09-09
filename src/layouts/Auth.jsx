// React
import React from "react";

import { Switch, Route } from "react-router-dom";

// Reactstrap components
import { Container, Row, Col } from "reactstrap";

// Core components
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";

import AuthFooter from "components/Footers/AuthFooter.jsx";

import routes from "routes";

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredRoutes: []
    };
  }

  componentWillMount() {
    this.setState({
      filteredRoutes: this.getRoutes(routes)
    });
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  getRoutes = routes => {
    return routes.filter(route => {
      if (route.layout !== "/auth") return null;

      return route;
    });
  };

  getRoutesComponents = routes => {
    return routes.map((route, key) => {
      return (
        <Route
          path={route.layout + route.path}
          component={route.component}
          key={key}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />

          <div className="header bg-gradient-success py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">
                      {process.env.REACT_APP_PROJECT_NAME}
                    </h1>

                    <p className="h2 text-dark">O Som do Cerrado</p>
                  </Col>
                </Row>
              </div>
            </Container>

            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>

          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutesComponents(this.state.filteredRoutes)}
              </Switch>
            </Row>
          </Container>
        </div>

        <AuthFooter />
      </>
    );
  }
}

export default Auth;
