function formatedChartData(chartTypeForChart = {}, chart = {}) {
  return {
    labels:
      chartTypeForChart.value === 'normal'
        ? chart?.chart_data?.map((c) => c?.[0]) || []
        : Object.keys(chart?.chart_data?.breakdownData).map((c) => c) || [],
    datasets:
      chartTypeForChart.value === 'normal'
        ? [
            {
              label: 'Hours Spent',
              data: chart.chart_data?.map((c) => c?.[1]) || [],
              backgroundColor: chart.chart_data?.map((c) => c?.[2]) || '',
            },
          ]
        : [
            {
              label: `Estimated Time: ${
                chart.chart_data.estimated
              }hrs     Total Time Spent: ${
                chart.chart_data.total
              }hrs     Total Breakdown: ${Object.values(
                chart?.chart_data?.breakdownData,
              ).reduce((sum, item) => sum + item, 0)}hrs   `,
              data: [
                ...(Object.values(chart?.chart_data?.breakdownData).map(
                  (c) => c,
                ) || []),
              ],
              backgroundColor: [
                ...(Object.values(chart?.log_colors).map((c) => c) || []),
              ],
            },
          ],
  }
}
// `Estimated Time: ${chart.chart_data.estimated}hrs
//               Total Time Spent: ${chart.chart_data.total}hrs
//               Total Breakdown: ${Object.values(
//                 chart?.chart_data?.breakdownData,
//               ).reduce((sum, item) => sum + item, 0)}hrs `

export default formatedChartData
