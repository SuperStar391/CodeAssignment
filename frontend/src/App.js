import React from 'react';
import Header from './Components/Header/Header';
import Container from '@mui/material/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTransaction from './Pages/Add';
import Home from './Pages/Home';

function App() {
  return (
    <React.Fragment>
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </React.Fragment>
  )
}

export default App;
