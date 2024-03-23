import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserTable from "../components/user/UserTable";
import { getUsers } from "../service";
import { Typography } from "@mui/material";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(effectFetchUsers, []);
  function effectFetchUsers() {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await getUsers();
        setUsers(response.users);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Something went wrong while fetching users");
      }
    }
    fetchUsers();
  }

  if (loading) {
    // @todo read-up on conditional rendering in React
    // https://react.dev/learn/conditional-rendering
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {/* @todo style this to look beautiful */}
            {/* <span style={{ color: "red" }}>Loading users...</span> */}
            <Typography
              variant="subtitle1"
              sx={{ color: "red", marginBottom: "1rem" }}
            >
              Loading users...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {/* @todo style this to look beautiful */}
            <span style={{ color: "red" }}>{error}</span>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <UserTable users={users} />
        </Paper>
      </Grid>
    </Grid>
  );
};
