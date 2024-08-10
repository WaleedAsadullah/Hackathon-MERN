import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LocalPostOffice } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addDocument } from '../../config/firebaseMethods';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function RoomAdd() {
  const [roomName, setRoomName] = useState('');
  const [availability, setAvailability] = useState('')
  const [price, setPrice] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument('room',
        {
            roomName:roomName,
            availability:availability,
            price:price,
        }
    );
    navigate('/dashboard/room/list')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalPostOffice />
          </Avatar>
          <Typography component="h1" variant="h5">
            Room Management
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="roomName"
                  name="roomName"
                  required
                  fullWidth
                  id="roomName"
                  label="Room Name"
                  autoFocus
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Availability *</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={availability}
                    required
                    fullWidth
                    label="Availability"
                    onChange={(e) => setAvailability(e.target.value)}
                >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </Select>

              </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='number'
                        autoComplete="price"
                        name="price"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        autoFocus
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Room
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RoomAdd;
