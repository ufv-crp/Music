// React
import React from "react";

import { Switch, Route } from "react-router-dom";

// Reactstrap components
import { Container } from "reactstrap";

// Core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";

import AdminFooter from "components/Footers/AdminFooter.jsx";

import Sidebar from "components/Sidebar/Sidebar.jsx";

// Routes
import routes from "routes.js";

const token = { scopes: ["updateUser"] };

class General extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredRoutes: []
    };
  }

  componentDidMount() {
    this.setState({
      filteredRoutes: this.getRoutes(routes)
    });
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;

    document.scrollingElement.scrollTop = 0;

    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.filter(route => {
      if (route.scope !== undefined) {
        if (token.scopes.includes(route.scope)) {
          console.log(
            `Route ${route.name} has scope and the token grant access`
          );

          return route;
        } else {
          console.log(
            `Route ${route.name} has scope, but the token don't grant access`
          );

          return null;
        }
      } else {
        console.log(
          `Route ${route.name} don't has scope, but the acess is granted`
        );

        return route;
      }
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

  // getBrandText = path => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       this.props.location.pathname.indexOf(
  //         routes[i].layout + routes[i].path
  //       ) !== -1
  //     ) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.state.filteredRoutes}
          bgColor="dark"
          logo={{
            innerLink: "/admin/dashboard",
            imgSrc: require("assets/img/logo.png"),
            imgAlt: process.env.REACT_APP_PROJECT_NAME
          }}
        />

        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            // brandText={this.getBrandText(this.props.location.pathname)}
          />

          <Switch>{this.getRoutesComponents(this.state.filteredRoutes)}</Switch>

          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default General;
