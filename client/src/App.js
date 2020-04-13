import React, { Component } from "react";
import Layout from "./hoc/layout/layout";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import RegisterComplaint from "./pages/registerComplaint/registerComplaint";
import GetComplaints from './pages/getComplaints/getComplaints';
import Aboutme from './pages/aboutme/aboutme';
import AccountRegister from './pages/accountRegister/accountRegister';
import AccountAuthorise from './pages/accountAuthorise/accountAuthorise';
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
          <Route path="/getComplaints" exact component={GetComplaints} />
          <Route path="/aboutme" exact component={Aboutme} />
          <Route path="/accountAuthorise" exact component={AccountAuthorise} />
          <Route path="/accountRegister" exact component={AccountRegister} />

          {/* <Route path="/:type" exact component={ProductList} />
            <Route path="/:type/:handle" exact component={Product} /> */}
        </Switch>
      </Layout>
    );
  }
}

export default App;
