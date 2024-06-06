import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import axios from 'axios';

const root = document.getElementById('root') as HTMLElement;
// const response = await axios.get('/api/hello') 
// console.log(response.data);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
