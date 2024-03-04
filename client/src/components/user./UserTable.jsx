import * as React from 'react';
import NewUser from './NewUser.dialog';
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
function createData(id, role, name, email) {
  return { id, role, name, email, deactivated: false};
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

export default function UserTable(props) {
  const [ rows, setRows ] = React.useState(rowVar)
  const [toEdit, setToEdit] = React.useState(null)
  // const [toArchiveId, setToArchiveId] = React.useState(null)
  

  function handleNewUser(newUser) {
    if (toEdit != null){
      const userIndex = rows.findIndex(
        (row) => row.id === toEdit.id,
      )
      if (userIndex === -1) {
        return
      }
      const modifiedRow = {
        id: toEdit.id,
        deactivated: toEdit.deactivated,
        ...newUser,
      };
      rows[userIndex] = modifiedRow
      setRows([...rows])
      return
    }
      console.log("ajout")
    
    const newRow = { id: rows.length, ...newUser};
    setRows([ ...rows, newRow ])
  }

  function editUser(user){
    setToEdit(user)
  }

  function deactivateUser(user) {
    const userIndex = rows.findIndex(
      (row) => row.id === user.id,
    )
    if (userIndex === -1) {
      return
    }
    rows[ userIndex ].deactivated = true
    setRows([ ...rows ])
  }

  function archiveUser(user) {
    const userIndex = rows.findIndex(
      (row) => row.id === user.id,
    )
    if (userIndex === -1) {
      return
    }
    rows.splice(userIndex, 1)
    setRows([ ...rows ])
  }
  

  return (
    <React.Fragment>
      <Title>User table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <span style={{color: row.deactivated ? "red" : "inherit"}}>{row.name}</span>
              </TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">
                <IconButton color="inherit" onClick={() => editUser(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => archiveUser(row)}>
                  <ArchiveIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => deactivateUser(row)}>
                  <DisabledIcon />
                </IconButton>
              </TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewUser toEdit={toEdit} onNewUser={handleNewUser} />
    </React.Fragment>
  );
}