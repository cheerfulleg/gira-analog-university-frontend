import './App.css';
import React from "react";

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import User from "./pages/User";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<MainPage/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/profile' element={<User/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
