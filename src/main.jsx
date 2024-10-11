import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProtectedRoute from './protected.js'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import CompetitionForm from './pages/apply.jsx'
import  AddGame from './pages/addgame.jsx'
import GameTable from './component/table.jsx'
import UserProfile from './pages/profile.jsx'
import ContactUs from './pages/contectus.jsx'
import TermsAndConditions from './pages/terms.jsx'
import AboutUs from './pages/aboutus.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/aboutUs' element={<AboutUs />} />
      <Route path='/termsAndConditions' element={<TermsAndConditions />} />
      {/* <Route path='/profile' element={<ProtectedRoute element={<UserProfile />} />} /> */}
      <Route path='/addgame'  element={<ProtectedRoute element={<AddGame />} />} />
      <Route path='/apply/:id' element={<ProtectedRoute element={<CompetitionForm />} />} />
      <Route path='/table' element={<ProtectedRoute element={<GameTable />} />}/>
      <Route path='/profile' element={<ProtectedRoute  element={<UserProfile />} />} />
      
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
