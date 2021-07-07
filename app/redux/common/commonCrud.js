import api from 'api/restClient'
import { API_URL } from 'constants/constants'

const urls = (type) => api.get(`${API_URL}/${type}?_fields=id,count,name,link`)

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
