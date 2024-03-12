import * as React from 'react';
import NewUser from './NewUser.dialog';
import EditIcon from '@mui/icons-material/Edit';
import DisabledIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import ArchiveUserWarningDialog from './ArchiveUserWarningDialog';

/**
 * @param {import("../../service").User[]} users
 */
function parseUserForTable(users) {
  return users.map(
    ({ _id, role, firstName, lastName, email, deactivated }) => ({
      id: _id,
      role,
      name: `${firstName} ${lastName}`,
      email,
      deactivated,
    })
  )
}


export default function UserTable(props) {
  const parsedUsers = parseUserForTable(props.users)
  const [ rows, setRows ] = React.useState(parsedUsers)
  const [toEdit, setToEdit] = React.useState(null)


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
            <TableCell align="center">Actions</TableCell>
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
                 Edit <EditIcon />
                </IconButton>
                Archive<ArchiveUserWarningDialog  onArchive={() => archiveUser(row)} />
                <IconButton color="inherit" onClick={() => deactivateUser(row)} >
                  Disable<DisabledIcon />
                </IconButton>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewUser toEdit={toEdit} onNewUser={handleNewUser} />
    </React.Fragment>
  );
}

