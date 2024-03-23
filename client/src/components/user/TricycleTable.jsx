import * as React from "react";
import NewTricycle from "./NewTricycle.dialog";
import EditIcon from "@mui/icons-material/Edit";
import DisabledIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import DisabledByDefaultOutlined from "@mui/icons-material/DisabledByDefaultOutlined";
import axios from "axios";
import { useEffect } from "react";
// import NewUserDialog from './NewUser.dialog';

// Generate Order Data
function createData(
  id,
  brand,
  weightCapacity,
  volumeCapacity,
  speciality,
  disponibility
) {
  return {
    id,
    brand,
    weightCapacity,
    volumeCapacity,
    speciality,
    disponibility,
    deactivated: false,
  };
}

const rowVar = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function ControllerTable(props) {
  const [rows, setRows] = React.useState(rowVar);
  const [toEdit, setToEdit] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tricycles")
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [toArchiveId, setToArchiveId] = React.useState(null)

  function handleNewTricycle(newTricycle) {
    if (toEdit != null) {
      const tricycleIndex = rows.findIndex((row) => row.id === toEdit.id);
      if (tricycleIndex === -1) {
        return;
      }
      const modifiedRow = {
        id: toEdit.id,
        deactivated: toEdit.deactivated,
        ...newTricycle,
      };
      rows[tricycleIndex] = modifiedRow;
      setRows([...rows]);
      return;
    }
    console.log("ajout");

    const newRow = { id: rows.length, ...newTricycle };
    setRows([...rows, newRow]);
  }

  function editTricycle(tricycle) {
    setToEdit(tricycle);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  function deleteTricycle(tricycle) {
    const tricycleIndex = rows.findIndex((row) => row.id === tricycle.id);
    if (tricycleIndex === -1) {
      return;
    }
    rows.splice(tricycleIndex, 1);
    setRows([...rows]);
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <span style={{ color: row.deactivated ? "red" : "inherit" }}>
                  {row.brand}
                </span>
              </TableCell>
              <TableCell>{row.weightCapacity}</TableCell>
              <TableCell>{row.volumeCapacity}</TableCell>
              <TableCell>{row.speciality}</TableCell>
              <TableCell>{row.disponibility}</TableCell>
              <TableCell align="right">
                <IconButton color="inherit" onClick={() => editTricycle(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => deleteTricycle(row)}>
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  href="/details/tricycles"
                  onClick={handleClickOpen}
                >
                  <InfoIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewTricycle toEdit={toEdit} onNewTricycle={handleNewTricycle} />
    </React.Fragment>
  );
}
