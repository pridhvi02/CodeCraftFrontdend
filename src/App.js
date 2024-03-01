
import './App.css';
import {Routes,Route} from 'react-router-dom';
import {useMemo} from "react";
import CssBaseline, { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import Navbar from './Components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';

import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Converter from './pages/Converter';


function App() {
  const theme = useMemo(()=> createTheme(themeSettings()));


  return (
    <>
    <ThemeProvider theme={theme}>
    <Navbar />
    <Toaster />
    <Routes>
      <Route path='/dash' element={<Dashboard/>} />
      <Route path="/" element={<Homepage/>}  />
      <Route path="/register" element={<Register/>}   />      
      <Route path="/login" element={<Login/>}  />
      <Route path="/code" element={<Converter/>}  />
      
    </Routes>
    </ThemeProvider>
    
    
    
    </>
  );
}

export default App;
