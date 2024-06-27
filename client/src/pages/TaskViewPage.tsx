import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import TaskView from '../components/TaskView';
import { useLocation, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function TaskViewPage() {

  const {currentScreen, setCurrentScreen} = useAppContext();

  const {state} = useLocation();
  const {taskId} = useParams();
  let title = state?.title ? `${state?.taskId || taskId || ''} - ${state.title}` : '' ;


  useEffect(() => {
    if (currentScreen !== 'tasks')
      setCurrentScreen('tasks')
  }, [currentScreen])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap',  mt:10, ml:2, }}>
      <Box
        sx={{
          display:'flex',
          width:'65vw',
          justifyContent:'space-between',

        }}

      >
        <Header title={title}></Header> 
        <Box 
        >
          <Box sx={{display:'flex', alignItems:'end', flex:1.0, height:'100%'}}>
          <Button 
            size='small'
            sx={{
              color:'#00796b',
              width:'180px',
              // height:'100px'
            }}
            type='submit'
            variant='text'
            >
              Lançar movimentação
          </Button>
          </Box>
        </Box>
      </Box>
        <TaskView></TaskView>
    </Box>
  );
}
