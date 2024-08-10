import React, { useState, useEffect } from 'react';
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
import { addDocument, getAllDocuments } from '../../config/firebaseMethods';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme();

const BookAdd = () => {
    const [customer, setCustomer] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [customerData, setCustomerData] = useState<any[]>([]);
    const [roomData, setRoomData] = useState<any[]>([]);
    const navigate = useNavigate()

    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getAllDocuments<any>('customer');
        setCustomerData(data);
        const room = await getAllDocuments<any>('room');
        setRoomData(room);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await addDocument('book',
          {
            customer:customer,
            room:room,
            date:date,
          }
      );
      navigate('/dashboard/book/list')
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl" style={{minWidth:'300'}} >
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
              Booking Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Customer *</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={customer}
                        required
                        fullWidth
                        label="Customer"
                        onChange={(e) => setCustomer(e.target.value)}
                    >   
                        {
                            customerData.map((item) => (
                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Room *</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={room}
                        required
                        fullWidth
                        label="Room"
                        onChange={(e) => setRoom(e.target.value)}
                    >   
                        {
                            roomData.map((item) => (
                                <MenuItem key={item.id} value={item.roomName + '(Rs. '+item.price+')'}>{item.roomName} (Rs. {item.price})</MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Date *</InputLabel>
                    <TextField
                        type='date'
                        autoComplete="date"
                        name="date"
                        required
                        fullWidth
                        id="date"
                        label=""
                        autoFocus
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default BookAdd;