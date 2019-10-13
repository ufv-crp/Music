// React
import React, { useContext } from "react";

import { Switch, Route } from "react-router-dom";

// Reactstrap components
import { Container } from "reactstrap";

// Context
import { AuthContext } from "../AuthProvider";

// Core components
import GeneralNavbar from "components/Navbars/GeneralNavbar.jsx";

import GeneralFooter from "components/Footers/GeneralFooter.jsx";

import Sidebar from "components/Sidebar/Sidebar.jsx";

// Routes
import routes from "routes.js";

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
      if (route.layout !== "/general") return null;

      if(route.scope !== null || route.scope !== undefined){
        for(let scope of route.scope) {
          if(!this.props.authentication.data.scopes.includes(scope)){
            // The token don't has at least one of the required scopes
            // to the current route
            return null;
          }
        }
      }
      
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
        <Sidebar
          {...this.props}
          routes={this.state.filteredRoutes}
          bgColor="black"
          logo={{
            innerLink: "/general/dashboard",
            imgSrc: require("assets/img/logo.png"),
            imgAlt: process.env.REACT_APP_PROJECT_NAME
          }}
        />

        <div className="main-content" ref="mainContent">
          <GeneralNavbar
            {...this.props}
            // brandText={Role Name}
          />

          <Switch>{this.getRoutesComponents(this.state.filteredRoutes)}</Switch>

          <Container fluid>
            <GeneralFooter />
          </Container>
        </div>
      </>
    );
  }
}

const GeneralFunctional = () => {
  const [authentication] = useContext(AuthContext);

  return(<General authentication={authentication}/>)
}

export default GeneralFunctional;
