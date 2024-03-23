import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function NewTricycleDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [weightCapacity, setWeightCapacity] = React.useState("");
  const [volumeCapacity, setVolumeCapacity] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [disponibility, setDisponibility] = React.useState("");

  React.useEffect(() => {
    editTricycle(props.toEdit);
    console.log(props.toEdit);
  }, [props.toEdit]);

  const editTricycle = (toEdit) => {
    if (!toEdit) {
      return;
    }
    setOpen(true);
    setBrand(toEdit.brand);
    setWeightCapacity(toEdit.weightCapacity);
    setVolumeCapacity(toEdit.volumeCapacity);
    setSpeciality(toEdit.speciality);
    setDisponibility(toEdit.disponibility);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/allTricycles", tricycle)
      .then((res) => {
        setAllTricycles([...allTricycles, res.data]);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Link color="primary" href="#" onClick={handleClickOpen} sx={{ mt: 3 }}>
        New Tricycle
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const {
              brand,
              weightCapacity,
              volumeCapacity,
              speciality,
              disponibility,
            } = formJson;
            console.log({
              brand,
              weightCapacity,
              volumeCapacity,
              speciality,
              disponibility,
            });
            props.onNewTricycle({
              brand,
              weightCapacity,
              volumeCapacity,
              speciality,
              disponibility,
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>Create a Tricycle.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="brand"
            label="Brand"
            type="string"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            value={weightCapacity}
            onChange={(e) => setWeightCapacity(e.target.value)}
            required
            margin="dense"
            id="weightCapacity"
            name="weightCapacity"
            label="Weight Capacity"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            value={volumeCapacity}
            onChange={(e) => setVolumeCapacity(e.target.value)}
            required
            margin="dense"
            id="volumeCapacity"
            name="volumeCapacity"
            label="Volume Capacity"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
            margin="dense"
            id="speciality"
            name="speciality"
            label="Speciality"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            value={disponibility}
            onChange={(e) => setDisponibility(e.target.value)}
            required
            margin="dense"
            id="disponibility"
            name="disponibility"
            label="Disponiblity"
            type="Date"
            fullWidth
            variant="standard"
          />
          {/* <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            fullWidth
          >
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              labelId="select-role_label"
              id="select-role"
              name="role"
              value={role}
              required
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"PT"}>PT</MenuItem>
              <MenuItem value={"LT"}>LT</MenuItem>
            </Select>
          </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
