import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { createBrowserRouter } from 'react-router-dom';
import TaskExample from './components/TaskExample.js';

const root = document.getElementById('root') as HTMLElement;

// const router = createBrowserRouter([
//   {
//     path: "/nova_tarefa",
//     element: <TaskExample></TaskExample>,
//   },
// ]);
// const response = await axios.get('/api/hello') 
// console.log(response.data);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
