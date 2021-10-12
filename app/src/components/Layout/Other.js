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
import ViewStaff from "../../container/Staff/ViewStaff/ViewStaff";
/*import EmployeeSchedule from "../../container/Employee/EmployeeSchedule/EmployeeSchedule";
import CreateEmployee from "../../container/Employee/CreateEmployee/CreateEmployee";
import ViewEmployee from "../../container/Employee/ViewEmployee/ViewEmployee";
import EditEmployee from "../../container/Employee/EditEmployee/EditEmployee";*/
import SalaryEmployee from "../../container/Employee/SalaryEmployee/SalaryEmployee";
import CreateOperation from "../../container/Operation/CreateOperation/CreateOperation";
import OperationSchedule from "../../container/Operation/OperationSchedule/OperationSchedule";
import OperationView from "../../container/Operation/OperationView/OperationView";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
/*
import EmployeeSchedule from "../../container/Employee/EmployeeSchedule/EmployeeSchedule";
*/
import EmployeeRoute from "../../container/Employee/EmployeeRoute/EmployeeRoute";
import Calendar from "../../container/Setting/Calendar/Calendar";

function Other () {
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle)
    }

    return (
        <Aux>
            <Router>
                <Header/>
                <Sidebar click ={toggleDrawer} toggle ={toggle} />
                <main className={['main', toggle ? 'active' : ''].join(' ')}>
                    <Switch>
{/*
                        <ProtectedRoute path="/employeeSchedule" component={EmployeeSchedule}/>
*/}
                        <ProtectedRoute path="/employee">
                            <EmployeeRoute/>
                        </ProtectedRoute>
                        {/*<ProtectedRoute path="/createEmployee" component={CreateEmployee}/>
                        <ProtectedRoute path="/editEmployee" component={EditEmployee}/>
                        <ProtectedRoute path="/viewEmployee" component={ViewEmployee}/>*/}
                        <ProtectedRoute path="/salaryEmployee" component={SalaryEmployee}/>
                        <ProtectedRoute path="/staffSchedule" component={StaffSchedule}/>
                        <ProtectedRoute path="/editStaff" component={EditStaff}/>
                        <ProtectedRoute path="/createStaff" component={CreateStaff}/>
                        <ProtectedRoute path="/viewStaff" component={ViewStaff}/>
                        <ProtectedRoute path="/createOperation" component={CreateOperation}/>
                        <ProtectedRoute path="/operationSchedule" component={OperationSchedule}/>
                        <ProtectedRoute path="/operationView" component={OperationView}/>
                        <ProtectedRoute path="/setting" component={Calendar}/>
                    </Switch>
                </main>

            </Router>
        </Aux>
    )
}

export default Other
