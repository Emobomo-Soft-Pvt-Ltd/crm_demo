import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import TeamFollows from './components/pages/TeamFollowsUp';
import MontlyConversations from './components/pages/MontlyConversations';
import Department from './components/pages/Department';
import Designation from './components/pages/Designation';
import Employees from './components/pages/Employees';
import AddEmployee from './components/pages/AddEmployee';
import UpdateEmployee from './components/pages/UpdateEmployee';
import InactiveEmployee from './components/pages/InactiveEmployee';
import AddLeads from './components/pages/AddLeads';
import AssignData from './components/pages/AssignData';
import AddInactiveEmployee from './components/pages/AddInactiveEmployee';
import Notice from './components/pages/Notice';
import UpdateLeads from './components/pages/UpdateLeads';
import BulkDataImport from './components/pages/BulkDataImport';
import Setting from './components/pages/Setting';
import SalesTodayFollowup from './components/pages/SalesTodayFollowup';
import SearchLeads from './components/pages/SearchLead';
import CallLogDetails from './components/pages/CallLogDetails';
import SalesLeads from './components/pages/SalesLeads';
import Projects from './components/pages/Projects';
import LoginDemo from './components/pages/LoginDemo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<LoginDemo />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/teamFollows' element={<TeamFollows />} />
        <Route path='/montlyConversations' element={<MontlyConversations />} />
        <Route path='/department' element={<Department />} />
        <Route path='/designation' element={<Designation />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/addEmployee' element={<AddEmployee />} />
        <Route path='/updateEmployee/:id' element={<UpdateEmployee />} />
        <Route path='/inactiveEmployee' element={<InactiveEmployee />} />
        <Route path='/addLeads' element={<AddLeads />} />
        <Route path='/assignData' element={<AssignData />} />
        <Route path='/addInactiveEmployee' element={<AddInactiveEmployee />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/updateLeads/:id' element={<UpdateLeads />} />
        <Route path='/bulkDataImport' element={<BulkDataImport />} />
        <Route path='/salesTodayFollowup' element={<SalesTodayFollowup />} />
        <Route path='/searchLead/:id' element={<SearchLeads />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/callLogDetails' element={<CallLogDetails />} />
        <Route path='/salesLeads' element={<SalesLeads />} />
        <Route path='/projects' element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
