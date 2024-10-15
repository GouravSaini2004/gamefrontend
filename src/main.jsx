import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import CompetitionForm from './pages/apply.jsx';
import AddGame from './pages/addgame.jsx';
import GameTable from './component/table.jsx';
import UserProfile from './pages/profile.jsx';
import ContactUs from './pages/contectus.jsx';
import TermsAndConditions from './pages/terms.jsx';
import AboutUs from './pages/aboutus.jsx';
import ForgetPasswordForm from './pages/forgotpassword.jsx';

function Main() {
  return (
    <HashRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/apply/:id" element={<CompetitionForm />} />
        <Route path="/table" element={<GameTable />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/forgot" element={<ForgetPasswordForm />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
