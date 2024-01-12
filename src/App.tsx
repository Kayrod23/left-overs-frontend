// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import Home from "./pages/Home/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import Recipes from "./pages/Recipes.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";


function App() {

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
