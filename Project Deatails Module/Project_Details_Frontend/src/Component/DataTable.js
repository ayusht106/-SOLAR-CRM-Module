import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import '../Css/datatable.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import Navbarmiddle from './Navbarmiddle';


const DataTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRow, setSelectedRow] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        if(!userEmail){
          console.error('User Email Not Found');
          return;
        }
        const response = await fetch('http://localhost:3020/api/details/',{
          headers:{
            'userEmail': userEmail,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const handleContactClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setData([...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }));
    setSortConfig({ key, direction });
  };

  const columns = [
    { name: 'finance', label: 'Finance Structure' },
    { name: 'project', label: 'Project Type' },
    { name: 'tentative', label: 'Tentative Capacity' },
    { name: 'companyS', label: 'Company State' },
    { name: 'companyc', label: 'Comapny City' },
  ];

  return (
     <div>
      <Navbar/>
     <Navbarmiddle/>
    <div className='outertable'>
      <div className="paginationWrapper">
      <Typography variant="body1" align="left" style={{ position: 'absolute', right: '1090px', top: '14px', fontSize:'14px' }} >
          Total Records: {data.length}
        </Typography>
          <TablePagination
            rowsPerPageOptions={[ 10, 15 , 20 , 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Records per page"
          />

          </div>


        <div className='tableWrapper'>
        <TableContainer component={Paper}>
          <Table className='table2'>
            <TableHead >
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.name} onClick={() => handleSort(column.name)}>
                    {column.label} {sortConfig.key === column.name && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={row._id} onClick={() => handleContactClick(row)} className='tableRowHover'>
              {columns.map(column => (
            <TableCell key={column.name}>
              {column.name === 'finance' ? (
              <Link to={`/update/${row._id}`}>{row[column.name]}</Link>
               ) : (
              row[column.name]
              )}
              </TableCell>
              ))}
              </TableRow>
              ))}
              </TableBody>
              </Table>

            </TableContainer>
           {data.length === 0 && (
          <Typography variant="body1" align="center">
            No data found
          </Typography>
        )}

      </div>
    </div>
    <NavbarBottom/>
    </div>
  );
};

export default DataTable;
