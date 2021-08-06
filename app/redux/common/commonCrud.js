import api from 'api/restClient'
import { API_URL } from 'constants/constants'

const urls = (type) =>
  api.get(`${API_URL}/${type}?per_page=100&_fields=id,count,name,link`)

export function getProjectFilterTypes() {
  const projectType = urls('project_type')
  const projectStatus = urls('project_status')
  const clients = urls('client')
  const developers = urls('developer')
  const designers = urls('designer')
  const projectTags = urls('project_tag')
  return api.all([
    projectType,
    projectStatus,
    clients,
    developers,
    designers,
    projectTags,
  ])
}

const categoriesUrl = `${API_URL}/categories?_field=id,count,description,name,slug,taxonomy,parent,meta`

export function getCategories() {
  return api.get(categoriesUrl)
}

const categoryIdUrl = (id) => `${API_URL}/categories/${id}?_fields=name`

export function getCategoryById(id) {
  return api.get(categoryIdUrl(id))
}
