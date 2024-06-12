import { CssBaseline } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { createBrowserRouter } from 'react-router-dom';
// import TaskExample, { action, getHello } from './components/NewTaskForm.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.js';
import Login from './pages/Login.js';
import SearchTaskForm from './components/SearchTaskForm.js';
import NewTaskPage from './pages/NewTaskPage.js';
import SearchTaskPage from './pages/SearchTaskPage.js';
import { loginAction } from './pages/Login.js';
import ErrorPage from './pages/ErrorPage.js';
import Register, { registerAction } from './pages/Register.js';
import ProjectPage from './pages/ProjectPage.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TaskGrid from './components/TaskGrid.js';
import CollapsibleTable from './components/CollapsibleTable.js';
import ExampleTable from './components/ExampleTable.js';
import TaskPage from './pages/TaskPage.js';

const root = document.getElementById('root') as HTMLElement;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'nova_tarefa',
        element:<NewTaskPage />,
        // action:action,
      },
      {
        path:'buscar',
        element:<SearchTaskPage />
      },
      {
        path:'/progresso',
        element:<CollapsibleTable />
      },
  {
    path:'/projetos',
    element:<ProjectPage />,
    // action:registerAction,
  },
  {
    path:'/task-grid',
    element:<TaskPage />,
    // action:registerAction,
  },
      // {
      //   path:'new_task',
      //   element:<TaskExample />
      // },
    ]
  },
  {
    path:'/login',
    element:<Login />,
    // action:loginAction,
  },
  {
    path:'/register',
    element:<Register />,
    action:registerAction,
  },
]);
// const response = await axios.get('/api/hello') 
// console.log(response.data);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* <CssBaseline /> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
    {/* <SignIn></SignIn> */}
    {/* <App /> */}
  </React.StrictMode>,
)
