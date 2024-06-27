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
import CreateTaskPage from './pages/CreateTaskPage.js';
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
import TaskView from './components/TaskView.js';
import TaskViewPage from './pages/TaskViewPage.js';
import NewProjectPage from './pages/NewProjectPage.js';
import TaskActivityPage from './pages/TaskActivityPage.js';

const root = document.getElementById('root') as HTMLElement;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
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
        path:':projectId/tasks',
        element:<SearchTaskPage />
      },
      {
        path:'/atividades',
        element:<TaskActivityPage />
      },
  {
    path:'projetos',
    element:<ProjectPage />,
    children:[

    ]
    // action:registerAction,
  },
  {
    path:'novo-projeto',
    element:<NewProjectPage />,
    // action:action,
  },
  {
    path:':projectId/nova_tarefa',
    element:<CreateTaskPage />,
    // action:action,
  },
  {
    path:':projectId/task/:taskId',
    element:<TaskViewPage />,
    // action:action,
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
