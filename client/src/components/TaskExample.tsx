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
import { Button, FormControlLabel, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function NewTask() {
  const [showPassword, setShowPassword] = React.useState(false);

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

  return (
  <ThemeProvider theme={theme}>
    <Box 
      id="form_wrapper"
      sx={{ 
        // background:'#C8C8C8',
        display: 'grid',
        alignItems:'center',
        // mt:10, ml:2,
        width:'100vw' ,
        gap:'10px'
      }}
    >
       {/* Linha um do form */}
      <Box id="form_linha_um"
          sx={
            {
              display:'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            }
          }
      >
        <Box
          id="input_tipo"
          sx={{
            display:'flex',
            
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 2'
          }}
        >
          <Typography
          align='right'
          sx={
            {
              width:LABEL_WIDTH

            }
          }
          
          >
            Tipo:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
            sx={{
              width:'50%'
            }}/>
        </Box>
        <Box
          id="input_prioridade"
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:3
          }}
        >
          <Typography
            align='right'
            sx={{
              width:LABEL_WIDTH_2
            }}
          >
            Prioridade:&nbsp;&nbsp;
          </Typography>
          <TextField
            size='small'
          />
        </Box>
      </Box>
      {/* Fim da linha um do form */}

      
       {/* Linha dois do form */}
      <Box id="form_linha_dois"
          sx={
            {
              display:'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
              // width:'auto'
            }
          }
      >
        <Box
          id="input_tipo"
          sx={{
            display:'flex',
            // flexWrap:'wrap',
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 3'
          }}
        >
          <Typography
          align='right'
          sx={
            {
              width:LABEL_WIDTH
            }
          }
          
          >
            Título:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
            sx={{
              width:'85%'
            }}/>
        </Box>
      </Box>
      {/* Fim da linha dois do form */}

      {/* Linha três do form */}
      <Box id="form_linha_tres"
        sx={
          {
            display:'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            // width:'auto'
          }
        }
      >
        <Box
          id="input_descricao"
          sx={{
            display:'flex',
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 3'
          }}
        >
          <Typography
          align='right'
          sx={
            {
              width:LABEL_WIDTH

            }
          }
          
          >
            Descrição:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
          multiline
          rows={5}
          sx={{
            width:'85%'
          }}/>
        </Box>
      </Box>
      {/* Fim da linha três do form */}

        {/* Linha quatro do form */}
        <Box id="form_linha_quatro"
          sx={
            {
              display:'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            }
          }
      >
        <Box
          id="input_tipo"
          sx={{
            display:'flex',
            
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 2'
          }}
        >
          <Typography
            align='right'
            sx={
              {
                width:LABEL_WIDTH
              }
            }
          >
            Atribuído para:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
            sx={{
              width:'50%'
            }}/>
        </Box>
        <Box
          id="input_prioridade"
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:3
          }}
        >
          <Typography 
              align='right'
              sx={{
                // width:LABEL_WIDTH/2
                width:LABEL_WIDTH_2
              }}>
              Tecnologia:&nbsp;&nbsp;
          </Typography>
          <TextField
            size='small'
          />
        </Box>
      </Box>
      {/* Fim da linha quatro do form */}

      {/* Linha cinco do form */}
      <Box id="form_linha_um"
          sx={
            {
              display:'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            }
          }
      >
        <Box
          id="input_tipo"
          sx={{
            display:'flex',
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 2'
          }}
        >
          <Typography
          align='right'
          sx={
            {
              width:LABEL_WIDTH

            }
          }
          
          >
            Andamento:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
            sx={{
              width:'50%'
            }}/>
        </Box>
        <Box
          id="input_prioridade"
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:3
          }}
        >
          <Box>
            <Typography 
              align='right'
              sx={{
                width:LABEL_WIDTH_2
              }}>
              Prazo:&nbsp;&nbsp;
            </Typography>
          </Box>
          <TextField
            size='small'
          />
        </Box>
      </Box>
      {/* Fim da linha um do form */}

      {/* Linha seis do form */}
      <Box id="form_linha_seis"
          sx={
            {
              display:'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            }}>
        {/* <Box
          id="input_tipo"
          sx={{
            display:'flex',
            
            alignItems:'center',
            alignContent:'left',
            gridColumn:'span 2'
          }}>
          <Typography
          align='right'
          sx={
            {
              color:'red',
              width:LABEL_WIDTH
            }
          } >
            Tipo:&nbsp;&nbsp;
          </Typography>
          <TextField 
            size='small'
            sx={{
              width:'50%'
            }}/>
        </Box> */}
        <Box
      
          id="enviar_tarefa_btn"
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:3
          }}
        >
          <Typography
           align='right'
           sx={
            {
              width:LABEL_WIDTH_2

            }
           }
          >
            {/* Prioridade:&nbsp;&nbsp; */}
          </Typography>
          <Button 
            size='large'
            sx={{
              width:'65%',
            }}
            variant='contained'>
              Enviar
          </Button>
          {/* <TextField
            size='small' /> */}
        </Box>
      </Box>
      {/* Fim da linha seis do form */}


    </Box>
    </ThemeProvider>
  );
}