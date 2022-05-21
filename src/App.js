import React from 'react';
import { AccountProvider } from './PAGES/AccountProvider.js';
import RouterPage from "./PAGES/RouterPage.js";



function App() {
  return (
    <AccountProvider>
    <RouterPage/>
    </AccountProvider>
  );
}

export default App;
