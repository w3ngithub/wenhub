import { projectSlice } from './project/projectSlice'
import { commonSlice } from './common/commonSlice'
import { blogSlice } from './blog/blogSlice'
import { projectLogSlice } from './projectLog/projectLogSlice'
import { addMediaSlice } from './addMedia/addMediaSlice'
import { userSlice } from './user/userSlice'

export const reducer = {
  [projectLogSlice.name]: projectLogSlice.reducer,
  [projectSlice.name]: projectSlice.reducer,
  [commonSlice.name]: commonSlice.reducer,
  [blogSlice.name]: blogSlice.reducer,
  [addMediaSlice.name]: addMediaSlice.reducer,
  [userSlice.name]: userSlice.reducer,
}
