import { Flex } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const PeiChart = ({ chartSeries }) => {
  const labels =
    chartSeries &&
    Object.keys(chartSeries).map((label) => {
      return label;
    });

  const dashboardData = chartSeries && Object.values(chartSeries);

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      labels: {
        colors: '#ffffff',
      },
    },
  };

  return (
    <Flex w='full' h='full' alignItems='center' justify='center'>
      <Chart
        options={chartOptions}
        series={dashboardData}
        type='pie'
        width='400'
      />
    </Flex>
  );
};

PeiChart.propTypes = {
  chartSeries: PropTypes.any,
};

export default PeiChart;
