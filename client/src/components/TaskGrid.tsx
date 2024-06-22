import * as React from 'react';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Header from './Header';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';

interface Data {
  taskId: number;
  id: number;
  title: string;
  type: string;
  assignedTo: string;
  priority: string;
  status: string;
  lastModification: string;
}

function createData(
  taskId: number,
  id: number,
  title: string,
  type: string,
  assignedTo: string,
  priority: string,
  status: string,
  lastModification: string,
): Data {
  return {
    taskId,
    id,
    title,
    type,
    assignedTo,
    priority,
    status,
    lastModification,
  };
}

// const rows = [
//   createData(1, 'Cupcake', "teste", "test", "test", "test", "10/10/10"),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Título',
  },
  {
    id: 'taskId',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Prioridade',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Andamento',
  },
  {
    id: 'assignedTo',
    numeric: true,
    disablePadding: false,
    label: 'Atribuído para',
  },
//   {
//     id: 'lastModification',
//     numeric: true,
//     disablePadding: false,
//     label: 'Última movimentação',
//   },
];



interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
    sx={{
        // marginTop:0,
        // maxHeight:'30px'
    }}>
      <TableRow color='primary'>
        <TableCell color='primary' padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}


export default function EnhancedTable({selected, setSelected, refetchTasks, triggerRefetchTasks}) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('taskId');
//   const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<Data[]>([]);

    const {projectId} = useParams();
    const allTasksQuery = useQuery({
        queryKey:[`all_tasks_${projectId}`],
        queryFn: async () => {
            const response = await axios.get(`/api/v1/projects/${projectId}/tasks`)
            triggerRefetchTasks(false)
            return response.data;
        }
    })

    useEffect(() => {
        if (!allTasksQuery.isLoading && allTasksQuery.data) {
          setRows(allTasksQuery.data);
        }
      }, [allTasksQuery.isLoading, allTasksQuery.data]);

    /**após a remoção de uma ou mais tarefas,
     * é necessário rebuscar as tarefas resultantes
     * esse useEffect é responsável por isso.
     */
    useEffect(() => {
        if (refetchTasks) {
            allTasksQuery.refetch();
        }
    }, [refetchTasks])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.taskId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number | string) => {
    const selectedIndex = selected.indexOf(id as number);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id as number);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id: number | string) => selected.indexOf(id as number) !== -1;


//   const buffer = allTasksQuery.isLoading ? [] : allTasksQuery?.data;
//   const rows = [...buffer];
//   let rows = allTasksQuery?.data || [];
  
//   React.useEffect(() => {
//     if (!allTasksQuery.isLoading) {
//         rows = allTasksQuery?.data;
//     }
//   }, [allTasksQuery.isLoading])

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );
    if(allTasksQuery.isLoading) 
    return <Container sx={{height:'100%', width:'80vw', marginLeft:'auto', marginTop:'auto', marginRight:'auto'}}>
                <CircularProgress></CircularProgress>
            </Container>
//   rows = allTasksQuery?.data;


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const primary = {
        main: '#00796b',           // Main teal color
        light: '#48a999',          // Lighter shade of the main color
        dark: '#004c40',           // Darker shade of the main color
        contrastText: '#ffffff'    // White text contrasts well with the main color
      };
      
        const theme = createTheme({
          palette: {
            primary,
          },
        });

    interface DeleteTask {
        taskIds:number[]
    }
    

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{mt:0, pt:0, width: '100%' }}>
     
      <Paper sx={{ 
            // width: '100vw',
             mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 50, tableLayout:'fixed' }}
            aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {!allTasksQuery.isLoading && visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.taskId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                //   <TableRow
                  <TableRow

                        onClick={(e) => handleClick(e, row.taskId)}

                        hover
                    // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.taskId}
                        selected={isItemSelected}
                        sx={{ 
                        // backGroundColor:'black',
                            cursor: 'pointer' 
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        />
                    </TableCell>
                    <TableCell
                    //   component="th"
                    //   component={Link}
                    //   to='projetos'
                    // sx={{all:'unset'}}
                        // component={Link}
                        // to={`/${projectId}/task/${row.taskId}`}
                        // state={visibleRows.filter(el => el.taskId == row.taskId)[0]}
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                    <Typography
                        component={Link}
                        to={`/${projectId}/task/${row.taskId}`}
                        state={visibleRows.filter(el => el.taskId == row.taskId)[0]}
                        sx={{
                            all:'unset',
                            textDecoration:'none',
                            fontColor:`${primary.main}`
                        }}
                    >
                      {row.title}
                    </Typography>
                    {/* <Link to='projetos'> */}
                      {/* {row.title} */}
                    {/* </Link> */}
                    </TableCell>
                    <TableCell
                    //   component="th"
                    //   component={Link}
                    //   to='projetos'
                    // sx={{all:'unset'}}
                    align='right'
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                    <Typography
                        component={Link}
                        to={`/${projectId}/task/${row.taskId}`}
                        state={visibleRows.filter(el => el.taskId == row.taskId)[0]}
                        sx={{
                            all:'unset',
                            textDecoration:'none'
                        }}
                        color={primary.main}
                    >
                      {row.taskId}
                    </Typography>
                    </TableCell>
                    <TableCell align="right">{row.priority}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.assignedTo || "Ninguém"}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    // height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={'Tarefas por página:'}
          labelDisplayedRows={({ from, to, count }) => { 
                return `${from}–${to} de ${count !== -1 ? 
                                            count : 
                                            `mais do que ${to}`}`; }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </ThemeProvider>
  );
}