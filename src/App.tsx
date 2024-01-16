// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import Home from "./pages/Home/Home.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import LogIn from "./pages/Login/Login.tsx";
import Recipes from "./pages/Recipes/Recipes.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";

function App() {

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        {/* <Route path="/" element={<LandingPage/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
