import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OtpVerificationForm from './components/OtpVerificationForm';
import { EmailProvider } from './components/EmailContext';
import ForgotPassword from './components/ForgotPassword';
import VerifyAndResetPassword from './components/VerifyAndResetPassword';
import AdminAddUser from './components/AdminAddUser';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <div className="App">
      <Navbar isAuthenticated={isLoggedIn} />
        <EmailProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path='/admin-adduser' element={<AdminAddUser/>}/>
            <Route path="/verify-otp" element={<OtpVerificationForm />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/reset-password' element={<VerifyAndResetPassword/>}/>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </EmailProvider>
    </div>
  );
}

export default App;