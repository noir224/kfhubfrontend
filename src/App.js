
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
//import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';
import Login from './login/login';
import ProjectList from './dashboards/admindashboard';
import LogoutButton from './Test';
import SignupUsers from "./signupusers/SignupUser"
//import api from './api/axiosConfig';

import CreateProject from './CreateProject/CreateProject';
import ViewUsers from './viewusers/viewusers';
import Layout from "./signupusers/Layout";
import ProjectDetails from './CreateProject/projectdetails';
import AddVersion from './versions/addversion';
import AddAVersion from './versions/AddAVersion';
import ForgotPassword from './login/forgotpassword';
import ResetPassword from './login/passreset';
import ViewVersion from './versions/versiondetails'
import EditProject from './CreateProject/editproject'
import AdminMainComp from './ghadaTemplate/adminMainComp'
import EditVersionN from './versions/editlastversion';
import Viewprofile from './Profile/viewprofile';
import Editprofile from './Profile/editprofile';
import UnAuth from './Test';
import withRoleAuthorization from './auth/authcheck';
import ProjectDetailsNB from './CreateProject/projectdetailsNB';
import DashboardNB from './ghadaTemplate/dashboardNB';
import ViewUsersNB from './viewusers/viewusersNB';


const Role = Object.freeze({
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER'
});



function App() {

  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole = Cookies.get('userRole');
    if (savedRole) {
      setRole(savedRole);
      //setRole(Role.DEVELOPER);
    }
  }, []);

  const pullRole = (data) => {
    setRole(data);
    //setRole(Role.DEVELOPER);
  };
  //<Route path='/projectsNB' element={<ClientTesterElement currentrole={role}><DashboardNB /></ClientTesterElement>} />
  //<Route path="/projectsNB/:projectname" element={<ProjectDetailsNB  />} />
  // element={<AddAVersion/>} 
  return (
    <div>
      <Routes>

        <Route path='/403' element={<UnAuth />} />
        <Route path='/login' element={<Login pullData={pullRole} />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpass' element={<ResetPassword />} />
        <Route path='/viewprofile' element={<ALLElement currentrole={role}><Viewprofile /></ALLElement>} />
        <Route path='/editprofile' element={<ALLElement currentrole={role}><Editprofile /></ALLElement>} />

        <Route path='/projects' element={<AdminDevDashElement currentrole={role}><AdminMainComp /></AdminDevDashElement>} />

        <Route path="/projects/:projectname" element={<DeveloperDetailsElement currentrole={role}><ProjectDetails /></DeveloperDetailsElement>} />

        <Route path="/editproject/:projectname" element={<AdminDevElement currentrole={role}><EditProject /></AdminDevElement>} />
        <Route path="/projects/:projectname/version/:vnum" element={<ViewVersion />} />
        <Route path='/createproject' element={<AdminDevElement currentrole={role}><CreateProject /></AdminDevElement>} />
        <Route path='/signupusers' element={<AdminElement currentrole={role}><SignupUsers /></AdminElement>} />
        <Route path='/viewusers' element={<AdminUsersElement currentrole={role}><ViewUsers /></AdminUsersElement>} />
        <Route path='/addversion/:projectname' element={<DeveloperElement currentrole={role}><AddAVersion /></DeveloperElement>} />
        <Route path='/editlastversion' element={<DeveloperElement currentrole={role}><EditVersionN /></DeveloperElement>} />
      </Routes>

    </div>

  );
}
function DeveloperDetailsElement({ currentrole, children }) {
  if (currentrole === Role.DEVELOPER)
    return <>{children}</>
  else if (currentrole !== null || currentrole !== '')
    return <ProjectDetailsNB />
  else
    return <UnAuth />
}
function DeveloperElement({ currentrole, children }) {
  if (currentrole === Role.DEVELOPER)
    return <>{children}</>
  else
    return <UnAuth />
}
function AdminElement({ currentrole, children }) {
  if (currentrole === Role.ADMIN)
    return <>{children}</>
  else
    return <UnAuth />
}

function AdminUsersElement({ currentrole, children }) {
  if (currentrole === Role.ADMIN)
    return <>{children}</>
    else if (currentrole !== null || currentrole !== '' || currentrole !== Role.CLIENT)
    return <ViewUsersNB />
  else
    return <UnAuth />
}

function ClientElement({ currentrole, children }) {
  if (currentrole === Role.CLIENT)
    return <>{children}</>
  else
    return <UnAuth />
}
function TesterElement({ currentrole, children }) {
  if (currentrole === Role.TESTER)
    return <>{children}</>
  else
    return <UnAuth />
}

function AdminDevElement({ currentrole, children }) {

  if (currentrole === Role.ADMIN || currentrole === Role.DEVELOPER)
    return <>{children}</>
  else
    return <UnAuth />
}

function AdminDevDashElement({ currentrole, children }) {

  if (currentrole === Role.ADMIN || currentrole === Role.DEVELOPER)
    return <>{children}</>
  else if (currentrole !== null || currentrole !== '')
    return <DashboardNB />
  else
    return <UnAuth />
}

function ALLElement({ currentrole, children }) {
  if (currentrole !== "")
    return <>{children}</>
  else
    return <UnAuth />
}

function AllButTesterElement({ currentrole, children }) {
  if (currentrole !== Role.TESTER)
    return <>{children}</>
  else
    return <UnAuth />
}
function AllButDeveloperElement({ currentrole, children }) {
  if (currentrole !== Role.TESTER)
    return <>{children}</>
  else
    return <UnAuth />
}
//

export default App;
