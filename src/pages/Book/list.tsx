import { useState, useEffect } from 'react';
import { getAllDocuments, deleteDocument } from '../../config/firebaseMethods';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BookList = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllDocuments<any>('book');
    setData(data);
  };

  const handleDelete = async (id: string) => {
    await deleteDocument('book', id);
    fetchData();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Room and Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item:any) => (
            <TableRow key={item.id}>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(item.id!)}>
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

export default BookList;
