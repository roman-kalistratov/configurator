import { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Divider,
  Stack,
  List,
  ListItem,
} from '@mui/material';

export default function CreditPayments() {
  const [selected, setSelected] = useState(1);

  const handleChange = (e, newValue) => {
    setSelected(newValue);
  };

  const payment = PAYMENT_OPTIONS.payments.find(
    (p) => p.payments === Number(selected),
  );

  const baseTotal = PAYMENT_OPTIONS.payments[0].total;

  return (
    <Box>
      <Typography variant="body2" fontSize={16} fontWeight={500} gutterBottom>
        *The amount of interest-free payments will be determined definitively in
        the shopping cart, taking into account the actual final amount to be
        paid (after using coupons and various benefits)
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" gutterBottom fontWeight={600}>
          Number of payments:
        </Typography>
        <Typography variant="body1" fontSize={18} gutterBottom fontWeight={700}>
          {selected} payments
        </Typography>
      </Stack>

      <Box px={3}>
        <Slider
          value={selected}
          onChange={handleChange}
          min={1}
          max={PAYMENT_OPTIONS.payments.length}
          step={1}
          aria-label="payments-indicator"
          size="medium"
          sx={{
            width: '100%',
            color: 'primary.main',
            // ensure thumb isn't clipped
            '& .MuiSlider-rail': {
              overflow: 'visible',
            },
            '& .MuiSlider-track': {
              overflow: 'visible',
            },
            '& .MuiSlider-thumb': {
              width: 14,
              height: 14,
            },
          }}
        />
      </Box>

      {payment && (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Total to pay:</Typography>
            <Typography variant="body1" fontWeight={700}>
              ₪{payment.total}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">First payment:</Typography>
            <Typography variant="body1" fontWeight={600}>
              ₪{payment.firstPayment}
            </Typography>
          </Stack>
          {payment.perPayment > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">
                  Second payment and onwards:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ₪{payment.perPayment}
                </Typography>
              </Stack>
            </>
          )}
          {payment.interestPayment && (
            <>
              <Divider sx={{ my: 1 }} />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1" color="error.main">
                  Includes interest of
                </Typography>
                <Typography variant="body1" fontWeight={700} color="error.main">
                  ₪{payment.interestPayment} /
                  {((payment.interestPayment / baseTotal) * 100).toFixed(1)}%
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Clarification of the policy section */}
      <Box>
        <Typography variant="body1" fontWeight={600} gutterBottom>
          Clarification of the KSP interest-free payment policy:
        </Typography>

        <Typography
          variant="body2"
          fontSize={16}
          component="div"
          sx={{ ml: 1 }}
        >
          1. Divide the total amount due by 250 and this is the maximum
          interest-free payment amount.
        </Typography>

        <Typography
          variant="body2"
          fontSize={16}
          component="div"
          sx={{ ml: 1, mt: 1 }}
        >
          2. Pay attention! The maximum number of interest-free payments is 15,
          according to the payments calculator.
        </Typography>

        <Typography
          variant="body2"
          fontSize={16}
          sx={{ mt: 1, ml: 1, textDecoration: 'underline' }}
        >
          Example of item eligible for interest-free payments:
        </Typography>

        <List dense sx={{ mt: 0 }}>
          <ListItem sx={{ py: 0 }}>
            <Typography variant="body2" fontSize={16}>
              • If the cost of the item is 3,750 NIS, it is eligible for 15
              interest-free payments
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <Typography variant="body2" fontSize={16}>
              • If the cost of the item is 4,000 NIS, it is eligible for 15
              interest-free payments (although the result of dividing by 250 is
              16)
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

const PAYMENT_OPTIONS = {
  status: true,
  payments: [
    { payments: 1, total: 625, firstPayment: 625, perPayment: 0 },
    { payments: 2, total: 625, firstPayment: 313, perPayment: 312 },
    {
      payments: 3,
      total: 637,
      firstPayment: 213,
      perPayment: 212,
      interestPayment: 12,
    },
    {
      payments: 4,
      total: 638,
      firstPayment: 161,
      perPayment: 159,
      interestPayment: 13,
    },
    {
      payments: 5,
      total: 639,
      firstPayment: 131,
      perPayment: 127,
      interestPayment: 14,
    },
    {
      payments: 6,
      total: 640,
      firstPayment: 110,
      perPayment: 106,
      interestPayment: 15,
    },
    {
      payments: 7,
      total: 641,
      firstPayment: 95,
      perPayment: 91,
      interestPayment: 16,
    },
    {
      payments: 8,
      total: 642,
      firstPayment: 82,
      perPayment: 80,
      interestPayment: 17,
    },
    {
      payments: 9,
      total: 643,
      firstPayment: 75,
      perPayment: 71,
      interestPayment: 18,
    },
    {
      payments: 10,
      total: 644,
      firstPayment: 68,
      perPayment: 64,
      interestPayment: 19,
    },
    {
      payments: 11,
      total: 645,
      firstPayment: 65,
      perPayment: 58,
      interestPayment: 20,
    },
    {
      payments: 12,
      total: 645,
      firstPayment: 62,
      perPayment: 53,
      interestPayment: 20,
    },
    {
      payments: 13,
      total: 647,
      firstPayment: 59,
      perPayment: 49,
      interestPayment: 22,
    },
    {
      payments: 14,
      total: 648,
      firstPayment: 50,
      perPayment: 46,
      interestPayment: 23,
    },
    {
      payments: 15,
      total: 649,
      firstPayment: 47,
      perPayment: 43,
      interestPayment: 24,
    },
  ],
};
