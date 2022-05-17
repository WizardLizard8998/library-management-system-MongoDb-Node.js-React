import React from 'react';
import RouterPage from './PAGES/routerPage';
import { AccountProvider } from "./DATA/Accountdata";


function App() {
  return (
    <AccountProvider>
    <RouterPage/>
    </AccountProvider>
  );
}

export default App;
