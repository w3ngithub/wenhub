import {
  ADD_NEW_BLOG_PATH,
  HOME_PATH,
  LMS_ADMIN_PATH,
  LMS_PATH,
  LOG_TIME_PATH,
  MY_PROJECTS_PATH,
  TMS_ADMIN_PATH,
  TMS_PATH,
  VIEW_BLOG_PATH,
  WEEKLY_REPORTS_PATH,
} from './routePath'

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
    path: HOME_PATH,
  },
  {
    id: 2,
    item: 'BLOG',
    subItem: [
      { id: 2.1, item: 'ADD NEW BLOG', path: ADD_NEW_BLOG_PATH },
      { id: 2.2, item: 'VIEW BLOG', path: VIEW_BLOG_PATH },
    ],
  },
  { id: 3, item: 'MY PROJECTS', path: MY_PROJECTS_PATH },
  { id: 4, item: 'LOG TIME', path: LOG_TIME_PATH },
  { id: 5, item: 'TMS', path: TMS_PATH },
  { id: 6, item: 'TMS ADMIN', path: TMS_ADMIN_PATH },

  {
    id: 7,
    item: 'LMS',
    path: LMS_PATH,
  },
  { id: 8, item: 'LMS ADMIN', path: LMS_ADMIN_PATH },

  { id: 9, item: 'WEEKLY REPORT', path: WEEKLY_REPORTS_PATH },
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
