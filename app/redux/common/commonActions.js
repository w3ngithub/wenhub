import axios from 'axios'
import * as requestFromServer from './commonCrud'
import { commonSlice } from './commonSlice'

const {
  filterOptionsFetching,
  filterOptionsFetchingSuccess,
  filterOptionsFetchingError,
} = commonSlice.actions

export const fetchFilterOptionLists = () => (dispatch) => {
  dispatch(filterOptionsFetching())
  return requestFromServer
    .getProjectFilterTypes()
    .then(
      axios.spread((...response) => {
        dispatch(
          filterOptionsFetchingSuccess({ data: response.map((x) => x.data) }),
        )
      }),
    )
    .catch((error) => {
      dispatch(filterOptionsFetchingError({ error: 'Error Fetching' }))
      console.log(error)
    })
}
