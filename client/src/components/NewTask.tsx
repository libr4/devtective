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
import { FormControlLabel } from '@mui/material';

export default function NewTask() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', mt:10, ml:2, width:'100vw' }}>
        <Box>
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
              Nova Tarefa
          </Typography>
        </Box> 
          
          <Box 
            sx={{
              display:'grid',
              alignItems:'center',
              gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
              // width:'auto'
              gap:'10px'
            }}
          >
          <Box
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:'span 2'
          }}
          >
          <Box sx={{width:'10vw'}}>
            <Typography 
              align='right'
              sx={{
                fontWeight: 700,
              }}
            >
              Tipo:&nbsp;&nbsp;
            </Typography>
          </Box>
            <TextField
              size='small'
              required
              InputLabelProps={{
                disableAnimation:true,
                sx: {
                }
              }}
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch', }}
            />
            </Box>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            // gridColumn:'span 2'
          }}
        >
          <Typography>Prioridade:</Typography>
          <TextField
            size='small'
            required
            InputLabelProps={{
              disableAnimation:true,
              sx: {
              }
            }}
            // id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch', }}
            // label="Tipo"
            // InputLabelProps={{
              // disableAnimation:true,
              
              // sx: {
              //   color: "#518eb9",
              //   fontSize: "28px",
              //   fontWeight: 1000,
              //   "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
              // }
            // }}
            // id="outlined-start-adornment"
          //   InputProps={{
          //     startAdornment: <InputAdornment position="start">sfsdfkg</InputAdornment>,
          //   }
          // }
      
            />
        </Box>
  </Box>

  <Box
   sx={{
    display:'grid',
    alignItems:'center',
    gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
    // width:'auto'
    gap:'10px'
  }}
  >
        <Box 
          sx={{
            display:'flex',
            alignItems:'center',
            gridColumn:'span 4'
            // width:'63vw',
          
          }} >
          <Box
            sx={
              {
                width:'16vw'

              }
            }
          
          >
            <Typography align='right'>
              Título:&nbsp;&nbsp; 
            </Typography>
          </Box>
          {/* <InputLabel  htmlFor="outlined-adornment-amount">Título</InputLabel> */}
          <TextField 
          fullWidth
          // sx={{width:'auto'}}
          // helperText={"test"}
          // inputProps={{step:300}}
          size='small'></TextField>
          {/* <OutlinedInput
        //   required
            id="outlined-adornment-amount"
            // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          /> */}
        {/* </FormControl> */}
        </Box>
        </Box>
      <Box 
        sx={{
          // display:'flex',
          width:'100%'
        }}
      >

        <Typography display={'block'}>Descrição: </Typography>
        <TextField
          size='small'
          label="Descrição"
          multiline
          rows={5}
          fullWidth
          id="filled-start-adornment"
          // sx={{ m: 1, }}
        //   InputProps={{
        //     startAdornment: <InputAdornment position="start"></InputAdornment>,
        //   }}
        //   variant="filled"
        />
      </Box>
        <Box sx={{
           display: 'grid',
           gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
          //  gridTemplateRows: 'repeat(8, auto)', /* Creates 8 rows */
          //  gap: '10px' /* Adjust the gap between items as needed */
        }}>
        {/* <Box 
        sx={{
          display:'flex',
          gridColumn: 1, gridRow: 1,
          alignItems:'center',

        }}> */}
          <Box sx={{width:'10vw'}} >
            <Typography >Atribuído para::&nbsp;</Typography>
          </Box>
          <TextField >Soemthign</TextField>
        {/* </Box>  */}
        <Box 
        sx={{
          display:'flex',
          gridColumn: 3, gridRow: 1,
          alignItems:'center'

        }}>
          <Typography >Prazo:&nbsp;</Typography>
          <TextField ></TextField>
        </Box> 
        <Box 
        sx={{
          display:'flex',
          gridColumn: 1, gridRow: 2,
          alignItems:'center'

        }}>
          
          <Typography >Prazo:&nbsp;</Typography>
          <TextField ></TextField>
        </Box>
        <Box 
        sx={{
          display:'flex',
          gridColumn: 3, gridRow: 2,
          alignItems:'center'

        }}>
          <Typography >Prazo:&nbsp;</Typography>
          <TextField ></TextField>
        </Box>
        {/* <TextField label="2" sx={{ gridColumn: 1, gridRow: 2 }}>Soemthign</TextField> */}
        {/* <TextField label="3" sx={{ gridColumn: 'span 2', gridRow: 3 }}>Soemthign</TextField> */}
        </Box>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      <div>
        <TextField
          label="With normal TextField"
          id="standard-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          variant="standard"
        />
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </Box>
  );
}