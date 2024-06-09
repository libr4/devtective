import { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
// import '../App.css'
import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';


export default function CustomDrawer() {
  const color = '#00796b'
    const icons = [
                    <CreateIcon color='primary' />, 
                    <SearchIcon color='primary'/>, 
                    <InboxIcon color='primary'/>, 
                    <MailIcon color='primary'/>
                  ];

  const drawerWidth = 210;

  const primary = {
    main: '#00796b',           // Main teal color
    light: '#48a999',          // Lighter shade of the main color
    dark: '#004c40',           // Darker shade of the main color
    contrastText: '#ffffff'    // White text contrasts well with the main color
};

const theme = createTheme({
  palette: {
    primary,
    // secondary: purple,
  },
});

  return (
    <>
    <ThemeProvider theme={theme}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Nova Tarefa', 'Buscar Tarefas', 'Filtros', 'Iniciar chat'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Configurações"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
    </>
)}