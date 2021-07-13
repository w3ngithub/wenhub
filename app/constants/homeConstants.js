export const projectColumns = [
  { title: '#', keyIndex: 'dataId', width: '1px' },
  {
    title: 'Name',
    keyIndex: 'name',
  },
  {
    title: 'Time Log',
    keyIndex: 'time_log',
    style: { whiteSpace: 'noWrap' },
  },
  { title: 'Path', keyIndex: 'path', style: { width: '227px' } },
  {
    title: 'Project Status',
    keyIndex: 'project_status',
    style: { width: '127px' },
  },
  {
    title: 'Project Type',
    keyIndex: 'project_type',
    style: { width: '120px' },
  },
  { title: 'Start Date', keyIndex: 'start_date', style: { width: '96px' } },
  { title: 'Deadline', keyIndex: 'deadline', style: { width: '96px' } },
]

export const projectDetailColumns = [
  { title: 'Path', keyIndex: 'path' },
  { title: 'Project Status', keyIndex: 'project_status' },
  { title: 'Live Url', keyIndex: 'live_url' },
  { title: 'Staging Url(s)', keyIndex: 'staging_url' },
  { title: 'Start Date', keyIndex: 'start_date' },
  { title: 'Deadline', keyIndex: 'deadline' },
  { title: 'Project Type', keyIndex: 'project_type' },
  { title: 'Project Tags', keyIndex: 'project_tags' },
  { title: 'Developers', keyIndex: 'developers' },
  { title: 'Designers', keyIndex: 'designers' },
  { title: 'Important Notes', keyIndex: 'important_notes' },
]
