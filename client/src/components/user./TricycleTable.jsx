import * as React from 'react';
// import NewTricycle from './NewTricycle.dialog';
import EditIcon from '@mui/icons-material/Edit';
import DisabledIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import DisabledByDefaultOutlined from '@mui/icons-material/DisabledByDefaultOutlined';

// Generate Order Data
function createData(id, brand, weightCapacity, volumeCapacity, speciality, disponibility) {
  return { id, brand, weightCapacity, volumeCapacity, speciality, disponibility, deactivated: false};
}

const rowVar = [
  createData(
    0,
    'PT',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    'LT',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, 'PT', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    'PT',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    'Admin',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
  
];


function preventDefault(event) {
  event.preventDefault();
}

export default function ControllerTable(props) {
  const [ rows, setRows ] = React.useState(rowVar)
  const [toEdit, setToEdit] = React.useState(null)
  // const [toArchiveId, setToArchiveId] = React.useState(null)
  

  function handleNewTricycle(newTricycle) {
    if (toEdit != null){
      const tricycleIndex = rows.findIndex(
        (row) => row.id === toEdit.id,
      )
      if (tricycleIndex === -1) {
        return
      }
      const modifiedRow = {
        id: toEdit.id,
        deactivated: toEdit.deactivated,
        ...newTricycle,
      };
      rows[tricycleIndex] = modifiedRow
      setRows([...rows])
      return
    }
      console.log("ajout")
    
    const newRow = { id: rows.length, ...newTricycle};
    setRows([ ...rows, newRow ])
  }

  function editTricycle(tricycle){
    setToEdit(tricycle)
  }

  function deactivateTricycle(tricycle) {
    const tricycleIndex = rows.findIndex(
      (row) => row.id === tricycle.id,
    )
    if (tricycleIndex === -1) {
      return
    }
    rows[ tricycleIndex ].deactivated = true
    setRows([ ...rows ])
  }

  function archiveTricycle(tricycle) {
    const tricycleIndex = rows.findIndex(
      (row) => row.id === tricycle.id,
    )
    if (tricycleIndex === -1) {
      return
    }
    rows.splice(tricycleIndex, 1)
    setRows([ ...rows ])
  }
  

  return (
    <React.Fragment>
      <Title>Tricycle table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell>Weight Capacity</TableCell>
            <TableCell>Volume Capacity</TableCell>
            <TableCell>Speciality</TableCell>
            <TableCell>Disponibility</TableCell>
            <TableCell align="right">Actions</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <span style={{color: row.deactivated ? "red" : "inherit"}}>{row.brand}</span>
              </TableCell>
              <TableCell>{row.weightCapacity}</TableCell>
              <TableCell>{row.volumeCapacity}</TableCell>
              <TableCell>{row.speciality}</TableCell>
              <TableCell>{row.disponibility}</TableCell>
              <TableCell align="right">
                <IconButton color="inherit" onClick={() => editTricycle(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => archiveTricycle(row)}>
                  <ArchiveIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => deactivateTricycle(row)}>
                  <DisabledIcon />
                </IconButton>
              </TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <newTricycle toEdit={toEdit} onNewTricycle={handleNewTricycle} />
    </React.Fragment>
  );
}