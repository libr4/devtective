import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, ThemeProvider, createTheme, Box, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import { useRef } from 'react';
import styles from './styles/ProjectCard.module.css';
// import cover from '../assets/detective.jpg'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
      light: '#48a999',
      dark: '#004c40',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    h5: {
      fontWeight: 'bold',
    },
  },
});

function getMemberNames(project) {
  const memberDetails = project.memberDetails;
  const memberNames = memberDetails.map(item => item.name)
  return memberNames;
}


// const {setTest} = useAppContext();

function StyledCard({ id, title , description, project, projectKey, }) {
  const cardRef = useRef(null);

  console.log(styles['clickEffect'])

  const {cardClicked, setCardClicked, setClickedElement} = useAppContext();
  const isCardClicked = (cardClicked === projectKey);
return (
  <ThemeProvider theme={theme}>
    <Card
      id={id}
      ref={cardRef}
      elevation={5}
      component={Link} 
      to={ isCardClicked ? `/${project._id}/tasks` : '#'}
      // to={false}
      // state={project}
      onClick={() => {
        setCardClicked(projectKey)
        console.log("eq: ", (cardClicked == projectKey))
        setClickedElement(cardRef)
      }}
      style={{
          transform: (isCardClicked) ? 'scale(1.09)' : undefined,
          boxShadow: (isCardClicked) ? '2px 8px 16px #00796b':undefined,
          transition: 'transform 0.3s, box-shadow 0.4s',
      }}

      sx={{
        textDecoration:'none',
        // all:'unset',
        maxWidth: 345,
        marginRight: 2,
        my:2,
        borderRadius: 2,
        width:'340px',
        height:'250px',
          // transform: 'scale(1.05)',
        '&:hover': {
          transition: 'transform 0.3s, box-shadow 0.3s',
          transform: 'scale(1.03)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
      // className={(isCardClicked) ? styles['clickEffect'] : ''}
    >
      {/* <CardActionArea 
        sx={{
          heigh:'100%',
          width:'100%',
        }}> */}
        <CardMedia
        component={'div'}
          sx={{ height: 0, backgroundColor: '#f0f0f0' }}
          // image={cover}
          title="green iguana"
        />
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              heigh:'100%',
              width:'100%',
              background: 'linear-gradient(to bottom, #ffd600 0%, #ffbf00 80%, #ffecb3 100%)',
              padding: '16px',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              display:'flex',
              alignItems:'center',
              alignContent:'center',
              justifyContent:'space-between'
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ color: 'white' }}
            >
              {title}
            </Typography>
            {/* <CardActions> */}
              <IconButton
              component={Link}
              to={`/${project._id}/alterar`}
              
              >
                <EditIcon 
                
                  sx={{color:'white'}}></EditIcon>
              </IconButton>
            {/* </CardActions> */}
          </Box>
          <Box sx={{ padding: '16px' }}>
            <Typography color="textSecondary" sx={{width:'100%'}}>
              {getMemberNames(project).join(', ')}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ wordWrap: 'break-word' }}>{description}</Typography>
          </Box>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  </ThemeProvider>
)};

export default StyledCard;