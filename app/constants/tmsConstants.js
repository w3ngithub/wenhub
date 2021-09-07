export const AttendanceRecordColumns = [
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Day', dataIndex: 'day', key: 'day' },
  {
    title: 'Punch-in Time',
    dataIndex: 'punchintime',
    key: 'punchintime',
  },
  {
    title: 'Punch-out Time',
    dataIndex: 'punchouttime',
    key: 'punchouttime',
  },
  {
    title: 'Office Hour',
    dataIndex: 'officehour',
    key: 'officehour',
    render: (item) =>
      +item < 9 ? (
        <span style={{ color: '#FF4D4F' }}>{item}hr</span>
      ) : (
        <span>{item}hr</span>
      ),
  },
]

export const AttendanceRecordData = [
  {
    key: 1,
    type: 'Working day',
    date: '19 september 2021',
    day: 'Monday',
    punchouttime: '12:17:06 AM',
    punchintime: '12:17:06 AM',
    officehour: '9',
  },
  {
    key: 2,
    type: 'Working day',
    date: '19 september 2021',
    day: 'Monday',
    punchouttime: '12:17:06 AM',
    punchintime: '12:17:06 AM',
    officehour: '8',
  },
  {
    key: 3,
    type: 'Working day',
    date: '19 september 2021',
    day: 'Monday',
    punchouttime: '12:17:06 AM',
    punchintime: '12:17:06 AM',
    officehour: '9',
  },
  {
    key: 4,
    type: 'Working day',
    date: '19 september 2021',
    day: 'Monday',
    punchouttime: '12:17:06 AM',
    punchintime: '12:17:06 AM',
    officehour: '8',
  },
]
