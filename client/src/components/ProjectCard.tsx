import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, ThemeProvider, createTheme, Box, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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

function getMemberNames(members) {
  const memberNames = members.map(item => item.name)
  return memberNames;
}

const StyledCard = ({ title , description, members}) => (
  <ThemeProvider theme={theme}>
    <Card
      elevation={5}
      sx={{
        maxWidth: 345,
        marginRight: 2,
        my:2,
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        width:'340px',
        height:'250px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
        component={'div'}
          sx={{ height: 0, backgroundColor: '#f0f0f0' }}
          // image={cover}
          title="green iguana"
        />
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
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
              <IconButton >
                <EditIcon sx={{color:'white'}}></EditIcon>
              </IconButton>
            {/* </CardActions> */}
          </Box>
          <Box sx={{ padding: '16px' }}>
            <Typography color="textSecondary" sx={{width:'100%'}}>
              {getMemberNames(members).join(', ')}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ wordWrap: 'break-word' }}>{description}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </ThemeProvider>
);

export default StyledCard;