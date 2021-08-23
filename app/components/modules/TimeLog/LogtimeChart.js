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
  // plugins: {
  //   legend: {
  //     display: false,
  //   },
  // },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const NormalChart = ({ data, chartType, fallbackContent }) => (
  <>
    <Bar
      data={data}
      options={chartType === 'stacked' ? option2 : options1}
      fallbackContent={fallbackContent}
    />
  </>
)

NormalChart.prototype = {
  data: PropTypes.object,
  chartType: PropTypes.string,
  fallbackContent: PropTypes.node,
}

NormalChart.defaultProps = {
  chartType: 'normal',
}

const AreDataAndChartTypeEqual = (prevProp, nextProp) =>
  prevProp.chartType === nextProp.chartType &&
  JSON.stringify(prevProp.data) === JSON.stringify(nextProp.data)

export default React.memo(NormalChart, AreDataAndChartTypeEqual)
