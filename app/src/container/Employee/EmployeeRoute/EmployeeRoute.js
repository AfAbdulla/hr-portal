import React from 'react';

import {Switch} from 'react-router-dom';

import ProtectedRoute from "../../../components/Layout/ProtectedRoute";
import EmployeeSchedule from "../EmployeeSchedule/EmployeeSchedule";
import CreateEmployee from "../CreateEmployee/CreateEmployee";


function EmployeeRoute() {
    return (
        <Switch>
            <ProtectedRoute path="/"  component={EmployeeSchedule}/>
            <ProtectedRoute path="/create" component={CreateEmployee}/>
        </Switch>

    );
}

export default EmployeeRoute
