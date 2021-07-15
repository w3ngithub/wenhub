import axios from 'axios'
import * as requestFromServer from './commonCrud'
import { commonSlice } from './commonSlice'

const {
  filterOptionsFetching,
  filterOptionsFetchingSuccess,
  filterOptionsFetchingError,
  categoriesFetching,
  categoriesFetchingSuccess,
  categoriesFetchingError,
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
    .catch((err) => {
      dispatch(filterOptionsFetchingError({ error: 'Error Fetching' }))
      console.log(err)
    })
}

export const fetchCategories = () => (dispatch) => {
  dispatch(categoriesFetching())
  return requestFromServer
    .getCategories()
    .then((res) => {
      dispatch(categoriesFetchingSuccess({ data: res.data }))
    })
    .catch((err) => {
      dispatch(categoriesFetchingError({ error: 'Sending Error' }))
      console.log(err)
    })
}
