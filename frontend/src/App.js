import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import All_Patients from './components/All_Patients';
import All_Doctors from './components/All_Doctors';
import Doctor from './components/Doctor'
import Patient from './components/Patient'
import AddDoctor from './components/AddDoctor'
import AddPatient from './components/AddPatient'

function App() {
    return (
        <BrowserRouter>
            <div>
                <h2>Welcome to Learning Project</h2>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link"> Home </Link></li>
                        <li><Link to={'/AllPatients'} className="nav-link">Patients</Link></li>
                        <li><Link to={'/AllDoctors'} className="nav-link">Doctors</Link></li>
                        {/* <li><Link to={'/addDoctor'} className="nav-link">Add Doctor</Link></li>
                        <li><Link to={'/AddPatient'} className="nav-link">Add Patient</Link></li> */}
                    </ul>
                </nav>
                <hr />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/AllPatients' component={All_Patients} />
                    <Route path='/AllDoctors' component={All_Doctors} />
                    <Route path='/Doctor/:id' component={Doctor} />
                    <Route path='/Patient/:doctorid/:id' component={Patient} />
                    <Route path='/addDoctor' component={AddDoctor} />
                    <Route path='/AddPatient' component={AddPatient} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default App;