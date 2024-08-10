import React, { useState, useEffect } from 'react';
import { getAllDocuments, deleteDocument } from '../../config/firebaseMethods';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RoomList = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const data = await getAllDocuments<any>('room');
    setRooms(data);
  };

  const handleDelete = async (id: string) => {
    await deleteDocument('room', id);
    fetchRooms();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room:any) => (
            <TableRow key={room.id}>
              <TableCell>{room.roomName}</TableCell>
              {
                room.availability === 1 ? (
                  <TableCell className='bg-success' >Available</TableCell>
                ) : (
                  <TableCell className='bg-danger'  >Not Available</TableCell>
                )
              }
              <TableCell>{room.price}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(room.id!)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomList;
