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
import SignIn from './pages/SignIn';
import NewTask from './components/NewTask';
import TaskExample from './components/TaskExample';
import Header from './components/Header';
import NewTaskPage from './pages/NewTaskPage';


function App() {

  const drawerWidth = 240;

  return (
    <>
      <CssBaseline />
    {/* <Box> */}
      <Box sx={{ display: 'flex' }}>
      <CustomAppBar></CustomAppBar>
      {/* <Toolbar></Toolbar> */}
      <CustomDrawer></CustomDrawer>
      {/* <Header></Header> */}
      {/* <Container maxWidth="xl" sx={{ mt: 20 }}> */}
        {/* <CollapsibleTable></CollapsibleTable> */}
        {/* <NewTask></NewTask> */}
        <NewTaskPage></NewTaskPage>
        {/* <TaskExample></TaskExample> */}
        {/* <Container>
        <Input sx={{marginTop:10}} />
        <Input sx={{marginTop:10}} />
        </Container> */}
      {/* </Container> */}
        {/* <ExampleTable></ExampleTable> */}
    {/* </Box> */}
    </Box>
    </>
  )
}

export default App
