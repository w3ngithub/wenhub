export const projectColumns = [
  { title: '#', keyIndex: 'dataId' },
  {
    title: 'Name',
    keyIndex: 'name',
    style: { width: '160px' },
  },
  {
    title: 'Time Log',
    keyIndex: 'time_log',
    style: { whiteSpace: 'noWrap' },
  },
  { title: 'Path', keyIndex: 'path', style: { width: '240px' } },
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
  { title: 'Start Date', keyIndex: 'start_date' },
  { title: 'Deadline', keyIndex: 'deadline' },
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
