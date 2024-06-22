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
import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, FormControlLabel, MenuItem, Select, Stack, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DatePicker } from '@mui/lab';
// import ptLocale from 'date-fns/locale/pt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "dayjs/locale/pt-br";
import axios from 'axios';
import TaskGrid from './TaskGrid';
import { Link, useLocation, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@tanstack/react-query';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../context/AppProvider';
import DynamicFilter from './DynamicFilter';

export default function SearchTaskForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {projectId} = useParams();
  console.log("projectid", projectId)

  

  const LABEL_WIDTH = 120;
  const LABEL_WIDTH_2 = 90;

  async function getHello() {
    const response = await axios.get('/api/hello') 
    console.log(response.data)
    return response;
  }

const primary = {
  main: '#00796b',           // Main teal color
  light: '#48a999',          // Lighter shade of the main color
  dark: '#004c40',           // Darker shade of the main color
  contrastText: '#ffffff'    // White text contrasts well with the main color
};

  const theme = createTheme({
    palette: {
      primary,
      secondary: {
        main:'#b71c1c',
      }
      // secondary: purple,
    },
  });

  const prioridades = ["Muito Baixa", "Baixa", "Média", "Alta", "Muito Alta"]
  const status = ["Aberta", "Desenvolvimento", "Teste", "Adiada", "Concluída", "Personalizada" ]
  const tipos = ["Erro", "Bug", "Requisito", "Funcionalidade", "Atualização", "Personalizada" ]

  const [prioridade, setPrioridade] = useState("Média");

  const [deleteClick, setDeleteClick] = useState(false);
  const [results, setResult] = useState(true);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [refetchTasks, triggerRefetchTasks] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  function toggleResult() {
    setResult(!results)
  }


  const deleteTasksMutation = useMutation({
    mutationFn:async (data: readonly number[]) => await axios.delete(`/api/v1/projects/${projectId}/tasks`, {data}),
    onSuccess:() => triggerRefetchTasks(true),
  })

  const closeDialog = () => {
    setConfirmationDialog(false);
  }
  const handleDeleteTasks = (e:React.FormEvent) => {
      e.preventDefault();
      console.log("to be deleted: ", selected)
      deleteTasksMutation.mutate(selected);
      setDeleteClick(false);
      closeDialog();
      setSelected([]);
  }



  const {state} = useLocation();
  const {projects, setCurrentProject, currentProject} = useAppContext();

  let project = state || JSON.parse(localStorage.getItem('currentProject') as string);

  useEffect(() => {
    if (project) {
      localStorage.setItem('currentProject',JSON.stringify(project));
      console.log(project)
      setCurrentProject(project);
    }
  }, [project, currentProject])
  
  return (
  <ThemeProvider theme={theme}>
    <Box 
      id="form_wrapper"
      sx={{ 
        overflow:'auto',
        // background:'#C8C8C8',
        display: 'grid',
        alignItems:'center',
        // mt:10, ml:2,
        // mb:0, pb:0,
        width:'100%' ,
        // gap:'10px',
        // pl:0
      }}
    >
      <Box
      component={'form'}
        sx={

          {
            display:'flex',
            alignItems:'center',
            gridTemplateColumns: 'repeat(4, 1fr)', /* Creates 4 equal columns */
            // gridColumn:'span 3'
          }
        }
        id="primeira_linha_busca">
          <Box
            id='label_busca'
            sx={
              {
                gridColumn:1,
                width:LABEL_WIDTH
              }
            }>
          <Typography
            align='right'
          >
            Atribuído para:&nbsp;&nbsp;
          </Typography>
        </Box>
        <Stack
          sx={{
            maxWidth:'70%',
            width:'70%',
          }}
        >

        <Autocomplete
          multiple
          // disablePortal
          disableClearable
          id="combo-box-demo"
          options={(project || currentProject).memberDetails.map(el => el.name)}
          // options={['1', '2', '3']}
          // sx={{ maxWidth: '100%', width: '100%',}}
          renderInput={(params) => <TextField {...params} size='small' placeholder='Nome(s) do(s) membro(s)'
          sx={{
            // gridColumn:'span 3',
            // width:'90%'
          }} />}
        />
        </Stack>
        <Button variant='contained'>
          Buscar
        </Button>
      </Box>
      <Box
        id="segunda_linha_busca"
        sx={{
          mt:0.5,
          display:'flex',
          justifyContent:'space-between'
        }}
      >
         <Box
          sx={{
          display:'flex',
          my:0.5,
          flex:1
            // width:420
          }}
          id="label_filtros"
        >
          <Button onClick={() => setResult(true)} >
            Resultados&nbsp; 
          </Button>
            {/* <Divider variant='middle' textAlign='center' orientation='vertical'/> */}
            {/* /&nbsp; */}
          <Button onClick={() => setResult(false)}>
             Outros filtros&nbsp;&nbsp;
          </Button>
        </Box>
        <Box 
          // component={'form'} 
          onClick={() => setConfirmationDialog(true)}
          // onSubmit={handleDeleteTasks} 
          sx={{ alignContent:'right'}}>
          <IconButton 
            // onClick={() => setConfirmationDialog(true)}
            type='submit'>
            <DeleteIcon 
              sx={{color:'#b71c1c'}} fontSize='large'></DeleteIcon>
          </IconButton>
        </Box>
        <Dialog 
          component={'form'}
          onSubmit={handleDeleteTasks}
          // method='DELETE'
          onClose={closeDialog}
          open={confirmationDialog}>
          <IconButton size='small' onClick={closeDialog} sx={{width:'10%', alignContent:'right', marginLeft:'auto'}}>
            <CloseIcon></CloseIcon>
          </IconButton>
          <DialogContent>
            {selected.length === 0 ? "Nenhuma tarefa selecionada!" : `Tem certeza que deseja deletar a(s) tarefa(s): ${[...selected].sort((a, b) => a - b).join(', ')}?`}
          </DialogContent>
          {!!selected.length && <DialogActions>
           <Button type='submit' variant='contained' color='secondary'>Deletar</Button>
          </DialogActions>}
        </Dialog>
        <Divider ></Divider>
        
      </Box>

      {results && <TaskGrid selected={selected} setSelected={setSelected} refetchTasks={refetchTasks} triggerRefetchTasks={triggerRefetchTasks}></TaskGrid>}

      {/* Container para os filtros */}
      {!results && <Box 
      id="filter_container"
      sx={{
        display:'flex',
        mt:2,
        // width:'100vw',
        flex:'wrap'
      }}>
        {/* Container para a primeira coluna, que contém uma label e um input */}
        <Box sx={{
           flex: 0.4, 
          display:'flex',
          flexDirection:'column',
          alignItems:'stretch',
          alignContent:'start',
          // border: '1px solid gray',
          gap:'10px'
        }}>
          <DynamicFilter label="Tipo" width={LABEL_WIDTH} selectItens={tipos}></DynamicFilter>
          <DynamicFilter label="Andamento" width={LABEL_WIDTH} selectItens={status}></DynamicFilter>
          {/* <DynamicFilter label="Prazo" inputType="date" width={LABEL_WIDTH}></DynamicFilter> */}
        </Box>
        <Box sx={{
           flex: 0.5, 
          display:'flex',
          flexDirection:'column',
          alignItems:'stretch',
          alignContent:'start',
          gap:'10px',
          // border: '1px solid gray'
        }}>
          <DynamicFilter label="Prioridade" width={LABEL_WIDTH_2} selectItens={prioridades}></DynamicFilter>
          <DynamicFilter label="Tecnologia" width={LABEL_WIDTH_2}></DynamicFilter>
          </Box>
        <Box sx={{
          flex: 0.9, 
          display:'flex',
          flexDirection:'column',
          alignItems:'stretch',
          alignContent:'start',
          gap:'10px',
          // border: '1px solid gray'
        }}>
          <DynamicFilter label="Prazo" inputType="date" width={LABEL_WIDTH}></DynamicFilter>
        </Box>
      </Box>}
    </Box>
    </ThemeProvider>
  );
}