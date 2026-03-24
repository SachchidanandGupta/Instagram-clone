import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './App.routes';
import "./features/shared/global.scss";
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App