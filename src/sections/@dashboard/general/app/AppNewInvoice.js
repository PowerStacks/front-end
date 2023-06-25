import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  TableContainer,
  Typography,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_
import { _appInvoices } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
AppNewInvoice.propTypes = {
  data: PropTypes.object,
};

export default function AppNewInvoice({data}) {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Purchase History" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Meter Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>ID</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.purchases?.length > 0
                ? data?.purchases?.map((row) => (
                    <TableRow key={row.purchase_id}>
                      <TableCell>{row.meter_number}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{fCurrency(row.amount)}</TableCell>
                      <TableCell>
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={
                            (row.status === 'in_progress' && 'warning') ||
                            (row.status === 'out_of_date' && 'error') ||
                            'success'
                          }
                        >
                          {sentenceCase(row.purchase_id)}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        {/* <MoreMenuButton /> */}
                      </TableCell>
                    </TableRow>
                  )) : <br/>
                // : _appInvoices.map((row) => (
                //     <TableRow key={row.purchase_id}>
                //       <TableCell>{row.meter_number}</TableCell>
                //       <TableCell>{row.date}</TableCell>
                //       <TableCell>{fCurrency(row.amount)}</TableCell>
                //       <TableCell>
                //         <Label
                //           variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                //           color={
                //             (row.status === 'in_progress' && 'warning') ||
                //             (row.status === 'out_of_date' && 'error') ||
                //             'success'
                //           }
                //         >
                //           {sentenceCase(row.purchase_id)}
                //         </Label>
                //       </TableCell>
                //       <TableCell align="right">
                //         <MoreMenuButton />
                //       </TableCell>
                //     </TableRow>
                //   ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
