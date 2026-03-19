import './App.css';
import Header from './pages/header/Header.js';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import PostEmployee from './pages/employee/PostEmployee';
import UpdateEmployee from './pages/employee/UpdateEmployee';

function App() {
  return ( 
    <>
    <Header />
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/employee" element={<PostEmployee />} />
        <Route path="/employee/:id" element={<UpdateEmployee />} />
    </Routes>
    </>
  );
}

export default App;
