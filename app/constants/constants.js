export const ADMIN_ROLE_ID = 1

export const API_URL = 'https://wendevs.com/wenhub-rt/wp-json/wp/v2'

// color
export const PRIMARY_COLOR = '#e0e0e0'
export const SECONDARY_COLOR = '#37549c'
export const PRIMARY_DARK_COLOR = '#44416f'

// navbar backgroundColor
export const navBarBackgroundColor = '#337ab7'

// navbar items
export const navBarItems = [
  {
    id: 1,
    item: 'HOME',
    path: '/',
  },
  {
    id: 2,
    item: 'BLOG',
    subItem: [
      { id: 2.1, item: 'ADD NEW BLOG', path: '/add-new-blog' },
      { id: 2.2, item: 'VIEW BLOG', path: '/blog' },
    ],
  },
  { id: 3, item: 'MY PROJECTS', path: '/my-projects' },
  { id: 4, item: 'LOG TIME', path: '/log-time' },
  {
    id: 5,
    item: 'LMS',
    path: '/lms',
  },
  { id: 6, item: 'LMS ADMIN', path: '/lms-admin' },
  {
    id: 7,
    item: 'EXPERTISE AREA',
    path: '/expertise-area',
  },
  { id: 8, item: 'WEEKLY REPORT', path: '/weekly-report' },
]

// table body style

export const tableBodyStyle = {
  background: 'white',
  fontWeight: 'bold',
  fontSize: '0.8rem',
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
