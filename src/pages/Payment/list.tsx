import { useState, useEffect } from 'react';
import { getAllDocuments, deleteDocument } from '../../config/firebaseMethods';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PaymentList = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllDocuments<any>('payment');
    setData(data);
  };

  const handleDelete = async (id: string) => {
    await deleteDocument('payment', id);
    fetchData();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking Details</TableCell>
            <TableCell>Collected Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item:any) => (
            <TableRow key={item.id}>
              <TableCell>{item.book}</TableCell>
              <TableCell>{item.collectAmount}</TableCell>
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

export default PaymentList;
