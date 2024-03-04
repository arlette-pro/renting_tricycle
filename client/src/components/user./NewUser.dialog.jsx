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

export default function NewUserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [ name, setName ] = React.useState("")
  const [ email, setEmail ] = React.useState("")
  const [ role, setRole ] = React.useState(null)

  React.useEffect(
      () => {
        editUser(props.toEdit);
        console.log(props.toEdit);
      },
      [props.toEdit]
  );

  const editUser = (toEdit) => {
    if (!toEdit) {
        return
    }
    setOpen(true)
    setName(toEdit.name)
    setRole(toEdit.role)
    setEmail(toEdit.email)
  }

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Link color="primary" href="#" onClick={handleClickOpen} sx={{ mt: 3 }}>
        New user
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
            const { email, role, name } = formJson;
            console.log({ email, role, name });
            props.onNewUser({ email, role, name });
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="string"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <FormControl
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
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
