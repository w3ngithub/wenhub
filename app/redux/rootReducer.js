import { projectSlice } from './project/projectSlice'
import { commonSlice } from './common/commonSlice'
export const reducer = {
  [projectSlice.name]: projectSlice.reducer,
  [commonSlice.name]: commonSlice.reducer,
}
