// src/App.js
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <div className="App">
      <AppRoutes isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
