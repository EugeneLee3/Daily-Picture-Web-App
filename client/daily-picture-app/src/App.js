import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LayoutLoader from './layouts/LayoutLoader';

// Vercel Analytics
import { inject } from '@vercel/analytics';
inject ();

function App() {
  return (
    <div>

      <div>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={ <LayoutLoader /> }>
              <Route index element={ <Home /> } />
              <Route path="sign-in" element={ <Login /> } />
              <Route path="register" element={ <Register /> } />
            </Route>
      
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
