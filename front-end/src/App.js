import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./plugins/AuthenticatedRoute";
import UnauthenticatedRoute from "./plugins/UnauthenticatedRoute";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <UnauthenticatedRoute
              exact
              path="/login"
              name="Login Page"
              component={Login}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <AuthenticatedRoute path="/" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
