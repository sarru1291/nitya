import React, { Component } from "react";
import Layout from "./hoc/layout/layout";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import RegisterComplaint from "./pages/registerComplaint/registerComplaint";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route
            path="/registerComplaint"
            exact
            component={RegisterComplaint}
          />
          

          {/* <Route path="/:type" exact component={ProductList} />
            <Route path="/:type/:handle" exact component={Product} /> */}
        </Switch>
      </Layout>
    );
  }
}

export default App;
