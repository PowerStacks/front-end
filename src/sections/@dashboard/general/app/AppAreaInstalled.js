import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

AppAreaInstalled.propTypes = {
  data: PropTypes.object,
};

export default function AppAreaInstalled({data}) {
  const [seriesData, setSeriesData] = useState(2023);

  const purchaseData = data?.purchases?.map(item => item.amount);

  const CHART_DATA = [
    {
      year: 2021,
      data: [
        { name: 'Prepaid', data: 
        [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        { name: 'Postpaid', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
      ],
    },
    {
      year: 2022,
      data: [
        { name: 'Prepaid', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
        { name: 'Postpaid', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
      ],
    },
    {
      year: 2023,
      data: [
        // { name: 'Prepaid', data:  [5, 18, 12, 51, 68, 11, 39, 37, 27, 20]
        // // {purchaseData}
        //   // [5, 18, 12, 51, 68, 11, 39, 37, 27, 20]
        //  },
        { name: 'Prepaid', data: purchaseData },
        // [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        { name: 'Postpaid', data: purchaseData },
        // [148, 91, 69, 62, 49, 51, 35, 41, 10] },
      ],
    },
  ];

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  });

  return (
    <Card>
      <CardHeader
        title="Yearly Usage"
        subheader="(+0%) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
