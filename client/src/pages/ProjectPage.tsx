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
import { Button, CircularProgress, FormControlLabel, MenuItem, Select, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DatePicker } from '@mui/lab';
// import ptLocale from 'date-fns/locale/pt';
import "dayjs/locale/pt-br";
import axios from 'axios';
import { Form } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import { useQuery } from '@tanstack/react-query';
import { useAppContext } from '../context/AppProvider';
import { handle } from 'express/lib/router';

export function getHello(e) {
    e.preventDefault();
    console.log(test)
    return null;
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)
  return null;
}

const CARD_ID_PREFIX = 'card_'

export default function ProjectPage() {
  
  const [showPassword, setShowPassword] = React.useState(false);


  const {sayHello, setProjects, setCurrentScreen, setCurrentUser, 
    cardClicked, setCardClicked,
    clickedElement, setClickedElement
  
  } = useAppContext();
  setCurrentScreen('projects')


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const LABEL_WIDTH = 120;
  const LABEL_WIDTH_2 = 90;


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


  const initialState = {
    type:'',
    priority:'',
    title:'',
    description:'',
    assignedTo:'',
    technology:'',
    status:'',
    deadline:'',
  }

  const projectQuery = useQuery({
    queryKey:['all_projects'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/projects')
      console.log(response.data)
      return response.data;
    }
  })

  const currentUserQuery = useQuery({
    queryKey:['current-user'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users/current-user')
      console.log("cuser ", response.data)
      setCurrentUser(response.data)
      
      return response.data;
    }
  })



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickedElement && !clickedElement.current.contains(event.target)) {
        setClickedElement(null)
        setCardClicked('');
        console.log(clickedElement)
      }
    };
    document.addEventListener('click', handleClickOutside, true)
    return () => {document.removeEventListener('click', handleClickOutside, true)}
  } , [clickedElement])

  useEffect(() => {
    if(!projectQuery.isLoading) {
      setProjects(projectQuery?.data)
    }
  }, [projectQuery.isLoading])

  
  if (projectQuery.isLoading) return 
    <Box sx={{ display: 'flex', flexWrap: 'wrap',  mt:10, ml:2 }}>
    <Box sx={{display: 'flex', flexWrap: 'wrap',  mt:10, ml:10 }}>
      CARREGANDO...
    </Box>
    </Box>


  return (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap',  mt:10, ml:2 }}>
    <Header title="Projetos"></Header>
    {  projectQuery.isLoading ? <CircularProgress />
    :<Box 
      id="form_wrapper"
      sx={{ 
        overflow:'auto',
        // background:'#C8C8C8',
        display: 'flex',
        alignItems:'center',
        flexWrap:'wrap',
         pl:2,
        width:'100vw',
        gap:'10px'
      }}
    >
      {projectQuery.data.map((item, index) => {
        console.log("itemid: ", item._id)
        return <ProjectCard id={CARD_ID_PREFIX + item._id} key={item._id} projectKey={item._id} project={item} title={item.name.toUpperCase()} description={item.description}></ProjectCard>
      })}
      {/* <ProjectCard title="DEVTECTIVE" description="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"></ProjectCard>
      <ProjectCard title="REDIRECT" description={"shablau"}></ProjectCard>
      <ProjectCard title="BLABLABLA" description={"shablau"}></ProjectCard> */}
    </Box>}
    </Box>
    </ThemeProvider>
  );
}