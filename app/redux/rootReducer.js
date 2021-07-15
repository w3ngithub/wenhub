import { projectSlice } from './project/projectSlice'
import { commonSlice } from './common/commonSlice'
import { blogSlice } from './blog/blogSlice'
import { projectLogSlice } from './projectLog/projectLogSlice'

export const reducer = {
  [projectLogSlice.name]: projectLogSlice.reducer,
  [projectSlice.name]: projectSlice.reducer,
  [commonSlice.name]: commonSlice.reducer,
  [blogSlice.name]: blogSlice.reducer,
}
