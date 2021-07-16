import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Blogs
const fetchBlog = `${API_URL}/posts?page=1&per_page=10`

export function getBlogs() {
  return api.get(fetchBlog)
}

// Paginating and Searching Blogs
function filterBlog(searchBlog, page, perPage) {
  return `${API_URL}/posts?page=${page}&per_page=${perPage}${
    searchBlog?.length > 0 ? `&search=${searchBlog}` : ''
  }`
}

export function filterBlogs(searchBlog, page, perPage) {
  return api.get(filterBlog(searchBlog, page, perPage))
}

// Get Detail of Blog
function fetchDetailBlog(id) {
  return `${API_URL}/posts/${id}`
}

export function getDetailBlog(id) {
  return api.get(fetchDetailBlog(id))
}
