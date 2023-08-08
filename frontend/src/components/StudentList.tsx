import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// Define the Field interface
interface Field {
  id: any;
  _id: any;
  name: string;
  email: string;
  phone: string;
  date: string;
  mathematics_mark: number;
  history_mark: number;
  science_mark: number;
  total_mark: number;
  status: string;
}

interface Column {
  id: keyof Field;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'mathematics_mark', label: 'Mathematics Mark', minWidth: 170, align: 'right' },
  { id: 'history_mark', label: 'History Mark', minWidth: 170, align: 'right' },
  { id: 'science_mark', label: 'Science Mark', minWidth: 170, align: 'right' },
  { id: 'total_mark', label: 'Total Mark', minWidth: 170, align: 'right' },
  { id: 'status', label: 'Status', minWidth: 170 },
];

interface Data extends Field {}

export default function StudentList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const [sortingField, setSortingField] = useState<keyof Field>('name'); // Default sorting field: 'name'
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc'>('asc'); // Default sorting order: 'asc'
  const nav = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (field: keyof Field) => {
    // Toggle the sorting order when the same field is clicked again
    if (field === sortingField) {
      setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Reset the sorting order if a new field is clicked
      setSortingField(field);
      setSortingOrder('asc');
    }
  };

  const handleEdit = (id: any) => {
    const rowData = rows.find((row) => row._id === id);
    if (rowData) {
      nav(`/update/${id}`, { state: rowData });
    };
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (response.status === 200) {
        setRows(rows.filter((row) => row._id !== id));
        // console.log("All the data in an arrey",rows)
      } else {
        console.error('Failed to delete record. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the record. Please try again later.');
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/list')
      .then((response) => {
        const data = response.data as Data[];
        setRows(data);
        // console.log(Data load successfully,data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Sort the rows based on the selected field and sorting order
    const sortedRows = [...rows].sort((a, b) => {
      if (sortingOrder === 'asc') {
        return a[sortingField] > b[sortingField] ? 1 : -1;
      } else {
        return a[sortingField] < b[sortingField] ? 1 : -1;
      }
    });
    setRows(sortedRows);
  }, [sortingField, sortingOrder]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: '100vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ backgroundColor: 'green', color: 'white' }}>
                S.No
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ backgroundColor: 'green', color: 'white', cursor: 'pointer' }}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                  {sortingField === column.id && (
                    <span>{sortingOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </TableCell>
              ))}
              <TableCell align="center" style={{ minWidth: 170, backgroundColor: 'green', color: 'white' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Button variant="contained" color="secondary" onClick={() => handleEdit(row._id)}>
                      Edit
                    </Button>
                    <span style={{ marginLeft: '10px' }} /> 
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
