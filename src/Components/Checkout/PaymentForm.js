import React from "react";

import {
  Grid,
  TextField,
  FormControlLabel,
  Typography,
  Checkbox,
  Stack
} from '@mui/material';
function PaymentForm() {
  return (
    <React.Fragment>
      <Stack spacing={3}>
        <Typography variant="h6" textAlign='center' gutterBottom>
          Payment method
        </Typography>

        <TextField required id="cardName" label="Name on card" fullWidth />

        <TextField required id="cardNumber" label="Card number" fullWidth />
        <Stack direction='row' spacing={1}>
          <TextField required id="expDate" label="Expiry date" fullWidth />

          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Stack>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="Remember credit card details for next time"
        />
      </Stack>
    </React.Fragment>
  );
}

export default PaymentForm;
