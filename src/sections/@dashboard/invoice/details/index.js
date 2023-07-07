import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
//
// import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails({ invoice }) {
  const theme = useTheme();

  if (!invoice) {
    return null;
  }

  const {
    amount,
    date,
    reference,
    status,
    units,

    // items,
    // taxes,
    // status,
    // dueDate,
    // discount,
    // invoiceTo,
    // createDate,
    // totalPrice,
    // invoiceFrom,
    // invoiceNumber,
    subTotalPrice,
  } = invoice;

  return (
    <>
      {/* <InvoiceToolbar invoice={invoice} /> */}

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>


          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <Box sx={{ textAlign: { sm: 'center' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (status === 'success' && 'success') ||
                  (status === 'unpaid' && 'warning') ||
                  (status === 'overdue' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>
              <br/>
              {typeof units === 'string' ? <Typography variant="h2">123456789</Typography> : <Typography variant="h2">{units}</Typography>}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ mb: 5,  textAlign: { sm: 'center' } }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date
            </Typography>
            <Typography variant="body2">{fDate(date)}</Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>
            <Typography variant="body2">{invoiceFrom.name}</Typography>
            <Typography variant="body2">{invoiceFrom.address}</Typography>
            <Typography variant="body2">Phone: {invoiceFrom.phone}</Typography>
          </Grid> */}

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>
            <Typography variant="body2">{invoiceTo.name}</Typography>
            <Typography variant="body2">{invoiceTo.address}</Typography>
            <Typography variant="body2">Phone: {invoiceTo.phone}</Typography>
          </Grid> */}

          

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>
            <Typography variant="body2">{fDate(dueDate)}</Typography>
          </Grid> */}
        </Grid>

        {/* <Scrollbar> */}
          <TableContainer >
            <Table>
              {/* <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="center">Unit price</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead> */}

              <TableBody>
                {/* {items.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="center">{fCurrency(row.price)}</TableCell>
                    <TableCell align="center">{fCurrency(row.price * row.quantity)}</TableCell>
                  </TableRow>
                ))} */}

                <RowResultStyle>
                  {/* <TableCell colSpan={6} /> */}
                  <TableCell align="center">
                    <Box sx={{ mt: 2 }} />
                    <Typography variant="h6">Amount</Typography>
                  </TableCell>
                  <TableCell align="center" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography variant="h6">₦{fCurrency(amount/100)}</Typography>
                  </TableCell>
                </RowResultStyle>

                {/* <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="center">
                    <Typography>Discount</Typography>
                  </TableCell>
                  <TableCell align="center" width={120}>
                    <Typography sx={{ color: 'error.main' }}>{discount && fCurrency(-discount)}</Typography>
                  </TableCell>
                </RowResultStyle> */}

                {/* <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="center">
                    <Typography>Taxes</Typography>
                  </TableCell>
                  <TableCell align="center" width={120}>
                    <Typography>{taxes && fCurrency(taxes)}</Typography>
                  </TableCell>
                </RowResultStyle> */}
<br/>
                <RowResultStyle>
                  {/* <TableCell colSpan={6} /> */}
                  <TableCell align="center">
                    <Typography variant="h6">Reference</Typography>
                  </TableCell>
                  <TableCell align="center" >
                    {/* <Typography variant="h6">{fCurrency(totalPrice)}</Typography> */}
                    {/* {typeof units === 'string' ? <Typography variant="h6">123456789</Typography> : <Typography variant="h6">{units}</Typography>} */}
                    <Typography variant="h6">{reference}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        {/* </Scrollbar> */}

        <Divider sx={{ mt: 5 }} />

        {/* <Grid container> */}
          <Grid item xs={12} md={9} sx={{ py: 3, textAlign: 'center'}}>
            {/* <Typography variant="subtitle2">NOTES</Typography> */}
            <Typography variant="body2">
            Thank you.  We appreciate your business.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="subtitle2">More enquiries</Typography>
            <Typography variant="body2">support@powerstack.co</Typography>
          </Grid>
        {/* </Grid> */}
      </Card>
    </>
  );
}
