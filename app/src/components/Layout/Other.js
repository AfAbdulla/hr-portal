import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary'
import ProtectedRoute from "./ProtectedRoute";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import StaffSchedule from "../../container/Staff/StaffSchedule/StaffSchedule";
import CreateStaff from "../../container/Staff/CreateStaff/CreateStaff";
import EditStaff from "../../container/Staff/EditStaff/EditStaff";
import EmployeeSchedule from "../../container/Employee/EmployeeSchedule/EmployeeSchedule";
import CreateEmployee from "../../container/Employee/CreateEmployee/CreateEmployee";
import EditEmployee from "../../container/Employee/EditEmployee/EditEmployee";
import CreateOperation from "../../container/Operation/CreateOperation/CreateOperation";
import OperationSchedule from "../../container/Operation/OperationSchedule/OperationSchedule";
import OperationView from "../../container/Operation/OperationView/OperationView";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default class Other extends React.Component {
    render() {
        return (
            <Aux>
                <Router>
                    <Header/>
                    <Sidebar/>
                        <main className="main">
                            <Switch>
                                <ProtectedRoute path="/employeeSchedule" component={EmployeeSchedule}/>
                                <ProtectedRoute path="/createEmployee" component={CreateEmployee}/>
                                <ProtectedRoute path="/editEmployee" component={EditEmployee}/>
                                <ProtectedRoute path="/staffSchedule" component={StaffSchedule}/>
                                <ProtectedRoute path="/editStaff" component={EditStaff}/>
                                <ProtectedRoute path="/createStaff" component={CreateStaff}/>
                                <ProtectedRoute path="/createOperation" component={CreateOperation}/>
                                <ProtectedRoute path="/operationSchedule" component={OperationSchedule}/>
                                <ProtectedRoute path="/operationView" component={OperationView}/>
                            </Switch>
                        </main>

                </Router>
            </Aux>
        )
    }
}
