import React from 'react';
import {Route, Switch, BrowserRouter as Router,  useRouteMatch} from 'react-router-dom';
import EmployeeCreate from "../EmployeeCreate/EmployeeCreate";
import Aux from "../../../hoc/Auxiliary";
import EmployeeSchedule from "../EmployeeSchedule/EmployeeSchedule";
import ViewEmployee from "../ViewEmployee/ViewEmployee";
import EditEmployee from "../EditEmployee/EditEmployee";


function EmployeeRoute() {
    let match = useRouteMatch();
    return (
      <Aux>
          <Router>
              <Switch>
                  <Route exact  path={match.path} component={EmployeeSchedule}/>
                  <Route path={`${match.path}/create`} component={EmployeeCreate}/>
                  <Route path={`${match.path}/view/:id`} component={ViewEmployee}/>
                  <Route path={`${match.path}/edit/:id`} component={EditEmployee}/>
              </Switch>
          </Router>
      </Aux>
    );
}

export default EmployeeRoute
