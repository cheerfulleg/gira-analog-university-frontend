import './App.css';
import React from "react";

import {Route, Routes} from 'react-router-dom'
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import User from "./pages/User";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Nav from "./components/Nav";
import {SnackbarProvider} from "notistack";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import {CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";

function App() {
    return (
        <SnackbarProvider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline/>
                <Nav/>
                <Container sx={{py: 3}} maxWidth="lg">
                    <Routes>
                        <Route exact path='/' element={<MainPage/>}/>
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/profile' element={<User/>}/>
                        <Route exact path='/register' element={<Register/>}/>
                        <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </Box>
        </SnackbarProvider>
    );
}


export default App;
