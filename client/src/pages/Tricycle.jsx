import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from '../components/Orders';

export const Tricycle = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders title="Tricycle" />
        </Paper>
      </Grid>
    </Grid>
  )
}
