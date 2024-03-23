import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TricycleTable from '../components/user/TricycleTable';

export const Tricycle = () => {
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TricycleTable />
        </Paper>
      </Grid>
    </Grid>
  )
}
