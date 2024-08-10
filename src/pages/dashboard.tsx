import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RTreeView from '../component/RTreeView';
import { Route, Routes } from "react-router-dom";
import RoomAdd from './Room/add';
import RoomList from './Room/list';
import CustomerAdd from './Customer/add';
import CustomerList from './Customer/list';
import BookAdd from './Book/add';
import BookList from './Book/list';
import PaymentAdd from './Payment/add';
import PaymentList from './Payment/list';
import DashboardC from '../component/DashboardC'
import { SpaceBar } from '@mui/icons-material';
import StaffAdd from './Staff/add';
import StaffList from './Staff/list';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
//   const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const treeStructure = [
    {
      modelName : 'Dashboard',
      prefix : '/dashboard',
      child : [
          {
              name : 'View',
              route : '/'
          },
      ]
    },
    {
      modelName : 'Room Management',
      prefix : '/dashboard/room',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          }
      ]
    },
    {
      modelName : 'Customer Management',
      prefix : '/dashboard/customer',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          }
      ]
    },
    {
      modelName : 'Booking Management',
      prefix : '/dashboard/book',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          }
      ]
    },
    {
      modelName : 'Payment Management',
      prefix : '/dashboard/payment',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          }
      ]
    },
    {
      modelName : 'Staff Management',
      prefix : '/dashboard/staff',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          }
      ]
    },

  ]
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Booking Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src='https://seeklogo.com/images/B/booking-logo-504475D532-seeklogo.com.png' width="140" style={{padding:"10px"}}  />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <RTreeView treeStructure={treeStructure} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <Routes>
            
                <Route path="/" element={ <DashboardC/> }/>

                <Route path="/room/add" element={ <RoomAdd/> }/>
                <Route path="/room/list" element={ <RoomList/> }/>

                <Route path="/customer/add" element={ <CustomerAdd/> }/>
                <Route path="/customer/list" element={ <CustomerList/> }/>

                <Route path="/book/add" element={ <BookAdd/> }/>
                <Route path="/book/list" element={ <BookList/> }/>

                <Route path="/payment/add" element={ <PaymentAdd/> }/>
                <Route path="/payment/list" element={ <PaymentList/> }/>

                <Route path="/staff/add" element={ <StaffAdd/> }/>
                <Route path="/staff/list" element={ <StaffList/> }/>

            </Routes>
      </Main>
    </Box>
  );
}
