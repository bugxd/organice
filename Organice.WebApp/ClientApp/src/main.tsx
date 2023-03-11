import React from 'react'
import ReactDOM from 'react-dom/client'

import 'semantic-ui-css/semantic.min.css'
import './index.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import App from './App';
import EditWorkflow from './pages/EditWorkflow';


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/edit/:workflowId",
                element: <EditWorkflow />
            },
        ]
    },
    
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
