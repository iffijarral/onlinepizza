import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const StatusSwitch = (props) => {
  
  return (

    <div>


      <Switch
        key={props.orderID}
        {...label}
        color="primary"
        onChange={(event) => props.handleSwitch(event, props.orderID)}
        checked={props.orderStatus==='Completed' ? true : false}
        disabled={props.orderSelection === 'all' ? true : false}
      />


    </div>
  );
}
