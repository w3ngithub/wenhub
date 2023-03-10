import axios from 'axios'
import * as requestFromServer from './commonCrud'
import { commonSlice } from './commonSlice'

const {
  filterOptionsFetching,
  filterOptionsFetchingSuccess,
  developerDesignerFetchSucess,
  filterOptionsFetchingError,
  categoriesFetching,
  categoriesFetchingSuccess,
  categoriesFetchingError,
  categoryFetching,
  categoryFetchingSuccess,
  categoryFetchError,
  leaveFieldsFetching,
  leaveFieldsSuccess,
  leaveFieldsFailure,
  clientAndProjectStatusFetchSucess,
} = commonSlice.actions

export const fetchFilterOptionLists = () => (dispatch) => {
  dispatch(filterOptionsFetching())
  return new Promise((resolve) => {
    requestFromServer
      .getProjectFilterTypes()
      .then(
        axios.spread((...response) => {
          const data = response.map((x) => x.data)
          dispatch(filterOptionsFetchingSuccess({ data }))
          resolve(data)
        }),
      )
      .catch((err) => {
        dispatch(filterOptionsFetchingError({ error: 'Error Fetching' }))
        console.log('fetch filter', err)
      })
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
      console.log('fetch category', err)
    })
}

export const fetchCategoryById = (id) => (dispatch) => {
  dispatch(categoryFetching())
  return requestFromServer
    .getCategoryById(id)
    .then((res) => {
      dispatch(categoryFetchingSuccess({ data: res.data }))
    })
    .catch((err) => {
      dispatch(categoryFetchError({ error: 'Sending Error' }))
      console.log(err.response)
    })
}

export const fetchLeaveFields = () => (dispatch) => {
  dispatch(leaveFieldsFetching())
  return requestFromServer
    .leaveFields()
    .then(
      axios.spread((...response) => {
        const data = response.map((x) => x.data)
        dispatch(leaveFieldsSuccess({ data }))
      }),
    )
    .catch((err) => {
      dispatch(leaveFieldsFailure({ error: 'Sending Error' }))
      console.log('fetch leave fields', err)
    })
}

export const fetchDeveloperDesigner = () => (dispatch) => {
  dispatch(filterOptionsFetching())
  return requestFromServer
    .getDeveloperDesigner()
    .then(
      axios.spread((...response) => {
        const data = response.map((x) => x.data)
        dispatch(developerDesignerFetchSucess({ data }))
      }),
    )
    .catch((err) => {
      dispatch(filterOptionsFetchingError({ error: 'Error Fetching' }))
      console.log('fetch developer and designer', err)
    })
}

export const clientAndProjectStatusFetch = () => (dispatch) => {
  dispatch(filterOptionsFetching())
  return requestFromServer
    .clientAndProjectStatusFetch()
    .then(
      axios.spread((...response) => {
        const data = response.map((x) => x.data)
        dispatch(clientAndProjectStatusFetchSucess({ data }))
      }),
    )
    .catch((err) => {
      dispatch(filterOptionsFetchingError({ error: 'Error Fetching' }))
      console.log('client project status', err)
    })
}
