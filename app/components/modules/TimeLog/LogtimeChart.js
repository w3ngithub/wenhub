import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'

const options1 = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Project Time Distrubtion',
    },
  },
}
const option2 = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
}

const NormalChart = ({ data, chartType }) => (
  <>
    <Bar data={data} options={chartType === '2' ? option2 : options1} />
  </>
)

NormalChart.prototype = {
  data: PropTypes.object,
  chartType: PropTypes.string,
}

NormalChart.defaultProps = {
  chartType: 1,
}

const AreDataAndChartTypeEqual = (prevProp, nextProp) =>
  prevProp.chartType === nextProp.chartType &&
  JSON.stringify(prevProp.data) === JSON.stringify(nextProp.data)

export default React.memo(NormalChart, AreDataAndChartTypeEqual)
