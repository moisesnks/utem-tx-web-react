// src/App.js
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

function App() {


  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
