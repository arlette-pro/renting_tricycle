import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress';
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
import { adminCreateUser } from "../../service"

export default function NewUserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [ firstName, setFirstName ] = React.useState("")
  const [ lastName, setLastName ] = React.useState("")
  const [ email, setEmail ] = React.useState("")
  const [ role, setRole ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(false)

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
    setFirstName(toEdit.firstName)
    setLastName(toEdit.lastName)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const { email, role, firstName, lastName } = formJson;
      const data = { email, role, firstName, lastName }
      console.log(data)
      const { user } = await adminCreateUser(data)
      // @question here: what's the password of the user created using the new user modal?
      props.onNewUser(user);
      handleClose();
    } catch (error) {
      console.error(error)
      alert("error creating new user")
    } finally {
      setLoading(false)
    }
  }

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
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new user.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="First name"
            type="string"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last name"
            type="string"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <Button type="submit">
            {loading ? (
              <CircularProgress size={16}/>
            ) : (
              <>
                Create
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
