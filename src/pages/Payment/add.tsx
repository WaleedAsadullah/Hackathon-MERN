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

const PaymentAdd = () => {
    const [book, setBook] = useState('');
    const [collectAmount, setCollectAmount] = useState('');
    const [bookData, setBookData] = useState<any[]>([]);
    const navigate = useNavigate()

    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getAllDocuments<any>('book');
        setBookData(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await addDocument('payment',
          {
            book:book,
            collectAmount:collectAmount,
          }
      );
      navigate('/dashboard/payment/list')
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
              Payment Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Bookings *</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={book}
                        required
                        fullWidth
                        label="Bookings"
                        onChange={(e) => setBook(e.target.value)}
                    >   
                        {
                            bookData.map((item) => (
                                <MenuItem key={item.id} value={item.customer + ' - ' + item.room + '  -  ' +  item.date}>{item.customer} - {item.room} - {item.date}</MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='number'
                        autoComplete="collectAmount"
                        name="collectAmount"
                        required
                        fullWidth
                        id="collectAmount"
                        label="Collect Amount"
                        autoFocus
                        value={collectAmount}
                        onChange={(e) => setCollectAmount(e.target.value)}
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

export default PaymentAdd;