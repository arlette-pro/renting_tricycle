import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export const MenuItem = (props) => {
  return (
    <Link to={props.path}>
        <ListItemButton>
          <ListItemIcon>
            {props.children}
          </ListItemIcon>
          <ListItemText primary={props.label}/>
        </ListItemButton>
    </Link>
  )
}
