import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UserTable from '../components/user./UserTable';

export const Users = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <UserTable />
        </Paper>
      </Grid>
    </Grid>
  )
}
