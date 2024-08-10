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
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const CustomerAdd = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await addDocument('customer',
          {
              name:name,
              address:address,
              mobile:mobile,
          }
      );
      navigate('/dashboard/customer/list')
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
              Customer Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Customer Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="address"
                    name="address"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    autoFocus
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='number'
                        autoComplete="mobile"
                        name="mobile"
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile"
                        autoFocus
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
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

export default CustomerAdd;