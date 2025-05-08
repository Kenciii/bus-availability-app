import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import logo from '../assets/img/logo.png';
import backgroundImage from '../assets/img/Picture.jpg'; 

const AdminPanel = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert('Invalid login credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.27)', 
          zIndex: 0,
        },
      }}
    >

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgb(255, 255, 255)',
          zIndex: 1,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 80,
              mb: 3,
            }}
          />
          <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
            LOGIN 
          </Typography>

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            sx={{ mb: 2, width: '75%' }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            sx={{ mb: 2, width: '75%' }}
          />

          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ mt: 2, width: '50%' }}
          >
            Log in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
