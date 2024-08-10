import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { getAllDocuments } from '../config/firebaseMethods';

function DashboardC() {

  const [customer, setCustomer] = useState<any[]>([]);
  const [room, setRoom] = useState<any[]>([]);
  const [book, setBook] = useState<any[]>([]);
  const [payment, setPayment] = useState(0);
  const [manager, setManager] = useState([]);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dataCustomer = await getAllDocuments<any>('customer');
    setCustomer(dataCustomer);
    const dataRoom = await getAllDocuments<any>('room');
    setRoom(dataRoom);
    const dataBook = await getAllDocuments<any>('book');
    setBook(dataBook);
    const dataPayment = await getAllDocuments<any>('payment');
    let payments = 0;
    dataPayment.map((item:any) =>{
      payments += Number(item.collectAmount)
      return item.collectAmount
    })
    setPayment(payments);

    const dataStaff = await getAllDocuments<any>('staff');

    let managers:any = dataStaff.filter((item:any) => item.role ==='Manager');
    let employee:any = dataStaff.filter((item:any) => item.role ==='Employee');
    setManager(managers);
    setEmployee(employee)
  };
  
  return (
    <Box
    component="main"
    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
  >
    <Toolbar />
    <Grid container spacing={3}>
      <Grid  xs={12} md={12} lg={12}>
        <div style={{textAlign:"center"}} >
        <img src='https://seeklogo.com/images/B/booking-logo-504475D532-seeklogo.com.png' width="250" style={{padding:"10px"}}  />
        </div>
      </Grid> 
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Customers
            </Typography>
            <Typography variant="h4">
              {customer.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total  Rooms
            </Typography>
            <Typography variant="h4">
              {room.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Bookings
            </Typography>
            <Typography variant="h4">
              {book.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Payment
            </Typography>
            <Typography variant="h4">
              {payment}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Manager
            </Typography>
            <Typography variant="h4">
              {manager.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Employee
            </Typography>
            <Typography variant="h4">
              {employee.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
  );
}

export default DashboardC;
