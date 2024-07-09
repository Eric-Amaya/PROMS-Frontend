import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import CustomToolbar from './components/CustomToolbar';
import ViewTask from './pages/ViewTask';
import ViewSchedule from './pages/ViewSchedule';
import ViewParticipants from './pages/ViewParticipants';
import Image from "./assets/avatar.png"
import LogoImage from "./assets/Logo_Image.png"

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };

  const userImage = Image;

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <Sidebar 
          onLogout={handleLogout} 
          isCollapsed={isCollapsed} 
          toggleDrawer={toggleDrawer} 
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default'}}
        >
          <CustomToolbar pageImg= {LogoImage} color = "#003057" userName = "Bastián Egaña" userImage={userImage}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/view" element={<ViewTask />} />
            <Route path="/view/task" element={<ViewTask />} />
            <Route path="/view/schedule" element={<ViewSchedule />} />
            <Route path="/view/resource" element={<ViewTask />} />
            <Route path="/view/participants" element={<ViewParticipants />} />
            <Route path="/view/performance" element={<ViewTask />} />
            <Route path="/view/document" element={<ViewTask />} />
            <Route path="/view/setting" element={<ViewTask />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
