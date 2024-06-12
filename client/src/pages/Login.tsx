import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GiSmokingPipe } from 'react-icons/gi';
import { useState } from 'react';
import { Form, redirect, useNavigate } from 'react-router-dom';
import cover from '../assets/detective.jpg'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{zIndex: (theme) => theme.zIndex.drawer + 1,}}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Devtective
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
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

  export async function loginAction({request}) {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log(data)
      await axios.post('/api/v1/auth/login', data);
      return redirect('/projetos');
    } catch (error) {
      return error;
    }
  }


    async function handleSubmit(e) {
      e.preventDefault();
      // const formData = await request.formData();
      console.log(e)
      // const data = Object.fromEntries(formData);
      // loginQuery.mutate('oi');
    }

    interface loginData {
      username:string;
      password:string;
    }

export default function SignIn() {
  const navigate = useNavigate()
  const loginQuery = useMutation({
    mutationFn: (data:loginData) => axios.post('/api/v1/auth/login', data),
    onSuccess:() => {navigate('/projetos')}
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data:loginData = Object.fromEntries(formData) as unknown as loginData;
    loginQuery.mutate(data);
  };

  const [register, setRegister] = useState(false);
  function handleRegisterToggle() {
    setRegister(!register);
  }


  return (
    <ThemeProvider theme={theme}>
      {/* <Form 
        method='post'> */}
      <Box 
      sx={{
        backgroundImage:`url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width:'100vw',
        height:'100vh',

      }}
      >
      <Container 
        
        component="main" maxWidth="xs"
        >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, mt:8, bgcolor: 'primary.main' }}>
            <GiSmokingPipe size={40} />
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">Entrar</Typography>
          <Form type='submit' onSubmit={handleSubmit} method='POST' component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              size='small'
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant='filled'
              sx={{
                backgroundColor:'white'
              }}
            />
            <TextField
              size='small'
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant='filled'
              sx={{
                backgroundColor:'white'
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Entrar</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" color={'primary.dark'} onClick={handleRegisterToggle} variant="body2">
                  {"Faça uma CONTA!"}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Box>
      {/* </Form> */}
    </ThemeProvider>
  );
}