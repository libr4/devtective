import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import { FormControlLabel, createTheme } from '@mui/material';
import Header from '../components/Header';
import TaskExample from '../components/NewTaskForm';
import { ThemeProvider } from '@emotion/react';
import { Copyright } from './Login';
import Footer from '../components/Footer';
import axios from 'axios';
import SearchTaskForm from '../components/SearchTaskForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';

export default function SearchTaskPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {setCurrentScreen} = useAppContext();
  useEffect(() => {
    setCurrentScreen('tasks')
  }, [])

  const primary = {
    main: '#9b111e',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
  };

  const theme = createTheme({
    palette: {
      primary,
    },
  });

  // const []

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', mt:9.5, ml:2, width:'65vw'}}>
        <Header title="Encontrar tarefas"></Header> 
        <SearchTaskForm></SearchTaskForm>
        <Footer></Footer>
    </Box>
  );
}