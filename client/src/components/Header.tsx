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
import { Alert, FormControlLabel } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { useLocation } from 'react-router-dom';

export default function Header(props:any) {

  let {title} = props;
  const {validation} = props;
  console.log(title)
  const {state} = useLocation()

  if(state?.title) title = state.title;
  const taskId = state?.taskId || '';

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', width:'45vw' }}>
        <Box 
          sx={{
            width:'100%',
            display:'flex',
            justifyContent:'space-between'
          }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              // pl:'1.0rem',
              pb:'1.0rem',
              pr:'2rem',
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {taskId ? (taskId + " - ") : ''}{title}
          </Typography>
          {validation && <Alert severity='error'>{validation}</Alert>}
        </Box> 
          
  </Box>
  );
}