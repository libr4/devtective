import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, createTheme, Divider, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TaskView() {
  const LABEL_WIDTH = 120;
  const LABEL_WIDTH_2 = 90;

  const primary = {
    main: '#00796b', // Main tckgeal color
    light: '#48a999', // Lighter shade of the main color
    dark: '#004c40', // Darker shade of the main color
    contrastText: '#ffffff', // White text contrasts well with the main color
  };

  const {state} = useLocation();

  const theme = createTheme({
    palette: {
      primary,
    },
  });

  interface editState {
      type:boolean,
      priority:boolean,
      description:boolean,
      assignedTo:boolean,
      technology:boolean,
      status:boolean,
      deadline:boolean,
  }

  const initialState = {

    type:false,
    priority:false,
    description:false,
    assignedTo:false,
    technology:false,
    status:false,
    deadline:false,
  }
  const [edit, setEdit] = useState<editState>(initialState);

  const prioridades = ["Muito Baixa", "Baixa", "Média", "Alta", "Muito Alta"]
  const status = ["Aberta", "Desenvolvimento", "Teste", "Adiada", "Concluída", "Personalizada" ]
  const tipos = ["Erro", "Bug", "Requisito", "Funcionalidade", "Atualização", "Personalizada" ]


  return (
    <ThemeProvider theme={theme}>
    <Box  sx={{position:'fixed',
          backgroundColor:'hsl(144, 72%, 95%)',
          height:'70vh',
          width:'78%',
          zIndex:-1000000,
          p:0,
          m:0,
          bottom:40,
          boxSizing:'border-box',
          // border:'1px solid grey'
          // top:50

    }}></Box>
    <Box
        component={'form'}
        method='post'
        sx={{
          display:'flex',
          flexDirection:'column',
          // width: '85vw',
          width: '100%',
          // backgroundColor:'#f5f5f5',
          height:'70vh',
          // backgroundColor:'hsl(144, 72%, 95%)',
          overflow: 'auto',
        }}
    
    >
      <Box
        id="form_wrapper"
        sx={{
          display: 'grid',
          alignItems: 'center',
          // gap: '20px',
          padding: '20px',
        }}
      >
        {/* <Typography variant="h5" sx={{gridRow:1, gridColumn: 'span 4', }}>
          Detalhes da tarefa
        </Typography> */}

        {/* Tipo & Prioridade */}
        <Box sx={{ display: 'grid', gridRow:2, gridColumn:'span 4', gridTemplateColumns: 'repeat(4, 1fr)', height:'8vh' }}>
          <Box sx={{ display:'flex', alignItems:'center', gridColumn: 'span 2'  }}>
            <Typography sx={{ textAlign: 'left', width: LABEL_WIDTH }}>
              Tipo:&nbsp;&nbsp;
            </Typography>
            {!edit.type ? 
              <Typography align='left'>
                {state.type}
              </Typography>
              :
              <Select
                name='type'
                size='small'
            // value={test}
            // onChange={(e) => {setTest(e.target.value)}}
            defaultValue={state.type}
            sx={
              {
                width:'30%',
                backgroundColor:'white'
              }
            }
          >
          {tipos.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            )
          })}

          </Select>
              }
            {!edit.type && <Button onClick={() => setEdit({...edit, type:true})}>
              <CreateIcon fontSize='10px' color='red' sx={{}} />
            </Button>}
            {edit.type && <Button onClick={() => setEdit({...edit, type:false})}>
              <CloseIcon color='primary' />
            </Button>}
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', gridColumn: 3}}>
            <Typography sx={{ textAlign: 'right', width: 90 }}>
              Prioridade:&nbsp;&nbsp;
            </Typography>
            {!edit.priority ? 
              <Typography>
                {state.priority}
              </Typography>
              :
              <Select
              name='type'
              size='small'
              // value={test}
              // onChange={(e) => {setTest(e.target.value)}}
              defaultValue={state.priority}
              sx={
                {
                  width:'50%',
                  backgroundColor:'white',
                }
              }
            >
            {prioridades.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              )
            })}
  
            </Select>
              }
            {!edit.priority && <Button onClick={() => setEdit({...edit, priority:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.priority && <Button onClick={() => setEdit({...edit, priority:false})}>
              <CloseIcon color='primary' />
            </Button>}
          </Box>
        </Box>
        {/* </Box> */}
        <Divider sx={{boxSizing:'border-box', gridColumn:'span 4', m:0, py:1, gridRow:3, width:'80%'}}></Divider>

      {/* <Box
        sx={{

        }}
      > */}
        {/* Descrição */}
        <Box 
          sx={{ 
            gridRow:4,
            height:'150px', 
            display:'flex',
            flexDirection:'column',
            // backgroundColor:'#f5f5f5', 
            gridColumn: 'span 4', 
            marginTop: '20px' }}>
          <Typography sx={{ textAlign: 'left', width: LABEL_WIDTH + 35 }}>
            Descrição:&nbsp;&nbsp;
          {!edit.description && <Button onClick={() => setEdit({...edit, description:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.description && <Button onClick={() => setEdit({...edit, description:false})}>
              <CloseIcon color='primary' />
            </Button>}
          </Typography>
          {!edit.description ? 
              <Typography
                sx={{
                  overflowY:'auto',
                  width:'70%',
                  wordWrap: 'break-word',
                }}
              >
                {state.description}
              </Typography>
              :
              <TextField value={state.description} multiline 
                rows={4} size='small' sx={{backgroundColor:'white', width:'50%'}}>
                
              </TextField>
              }
            
          {/* <Typography>{state.description}</Typography> */}
        </Box>
      </Box>

        <Divider sx={{gridColumn:'span 4', m:0, p:0, mx:2, gridRow:3}}></Divider>
        {/* Atribuído para & Tecnologia */}
        <Box sx={{display:'flex', pt:'40px', pl:'20px', height:'10vh'}}>
          <Box sx={{display:'flex', alignItems:'center', flex:1}}>
            <Typography sx={{ textAlign: 'left', width: LABEL_WIDTH + 10 }}>
              Atribuído para:&nbsp;&nbsp;
            </Typography>
            {/* <Typography>{state.assignedTo}</Typography> */}
            {!edit.assignedTo ? 
              <Typography>
                {state.assignedTo}
              </Typography>
              :
              <TextField value={state.assignedTo} size='small' sx={{backgroundColor:'white', width:'40%'}}>
              </TextField>
              }
            {!edit.assignedTo && <Button onClick={() => setEdit({...edit, assignedTo:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.assignedTo && <Button onClick={() => setEdit({...edit, assignedTo:false})}>
              <CloseIcon color='primary' />
            </Button>}
          </Box>
          <Box sx={{display:'flex', alignItems:'center', flex:1}}>
            <Typography sx={{ textAlign: 'right', width: LABEL_WIDTH_2 }}>
              Tecnologia:&nbsp;&nbsp;
            </Typography>
            {!edit.technology ? 
              <Typography>
                {state.technology}
              </Typography>
              :
              <TextField value={state.technology} size='small' sx={{backgroundColor:'white', width:'40%'}}>
              </TextField>
              }
            {!edit.technology && <Button onClick={() => setEdit({...edit, technology:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.technology && <Button onClick={() => setEdit({...edit, technology:false})}>
              <CloseIcon color='primary' />
            </Button>}
            {/* <Typography>{state.technology}</Typography> */}
          </Box>
          <Box sx={{display:'flex', alignItems:'center', flex:2}}>
            <Typography sx={{alignItems:'center', textAlign: 'left', width: LABEL_WIDTH_2 }}>
              Prazo:&nbsp;&nbsp;
            </Typography>
            {edit.deadline ? <LocalizationProvider 
          adapterLocale='pt-br'
          dateAdapter={AdapterDayjs}>
          <DatePicker 
              name='deadline'
              sx={{backgroundColor:'white'}}
          />
        </LocalizationProvider>
         : <Typography>{state.deadline}</Typography>}
         {!edit.deadline && <Button onClick={() => setEdit({...edit, deadline:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.deadline && <Button onClick={() => setEdit({...edit, deadline:false})}>
              <CloseIcon color='primary' />
            </Button>}
          </Box>
        </Box>

        {/* Andamento & Prazo */}
        <Box sx={{display:'flex', alignItems:'center', padding:'20px', pt:'30px'}}>
          <Box sx={{display:'flex', alignItems:'center', flex:1}}>
            <Typography sx={{ textAlign: 'left', width: LABEL_WIDTH }}>
              Andamento:&nbsp;&nbsp;
            </Typography>
            {!edit.status ? 
              <Typography align='left'>
                {state.status}
              </Typography>
              :
              <Select
                name='type'
                size='small'
            // value={test}
            // onChange={(e) => {setTest(e.target.value)}}
            defaultValue={state.status}
            sx={
              {
                width:'30%',
                backgroundColor:'white'
              }
            }
          >
          {status.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            )
          })}

          </Select>
              }
            {!edit.status && <Button onClick={() => setEdit({...edit, status:true})}>
              <CreateIcon fontSize='10px' color='primary' />
            </Button>}
            {edit.status && <Button onClick={() => setEdit({...edit, status:false})}>
              <CloseIcon color='primary' />
            </Button>}
            {/* <Typography>{state.status}</Typography> */}
          </Box>
          <Box sx={{display:'flex', alignItems:'center', flex:1.0}}>
          <Button 
          // onClick={() => setValidation("button clicked")}
            size='large'
            sx={{
              // width:'70%',
            }}
            type='submit'
            variant='contained'>
            Modificar tarefa
          </Button>
            {/* <Typography>{state.deadline}</Typography> */}
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}