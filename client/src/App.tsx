import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import './App.css'
import React from 'react'
import axios from 'axios'
import CustomAppBar from './components/CustomAppBar';
import CollapsibleTable from './components/CollapsibleTable';
import ExampleTable from './components/ExampleTable';
import CustomDrawer from './components/CustomDrawer';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import SignIn from './pages/Login';
import Header from './components/Header';
import NewTaskPage from './pages/CreateTaskPage';
import SearchTaskForm from './components/SearchTaskForm';
import SearchTaskPage from './pages/SearchTaskPage';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import AppProvider from './context/AppProvider';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';


function App() {
  const getCurrentUserQuery = useQuery({
    queryKey:['current-user'],
    queryFn:async () => {
        const response = await axios.get('/api/v1/users/current-user');
        console.log(JSON.parse(response.data))
        return response.data

    },
    // onError:(error) => {
    //   console.log(error)
    // }

  })
  const navigate = useNavigate();
  if (getCurrentUserQuery.isError) {
    navigate('/login')
  }

  const drawerWidth = 240;

  if (getCurrentUserQuery.isLoading)
    return <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Ensures it covers the full viewport height
  }}>
  <CircularProgress />
</Box>
  return (
    <>
    <AppProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <CustomAppBar></CustomAppBar>
        <CustomDrawer></CustomDrawer>
        {/* <NewTaskPage></NewTaskPage> */}
        <Outlet/>
        {/* <SearchTaskPage></SearchTaskPage> */}
        <Footer></Footer>
      </Box>
    </AppProvider>
    </>
  )
}

export default App
