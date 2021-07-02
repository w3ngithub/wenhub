import api from 'api/restClient'
import { API_URL } from 'constants/constants'

const PROJECTS_URL = `${API_URL}/projects?per_page=100&_fields=id,title,link,excerpt,author,acf_fields,_links&_embed`

export function getProjects() {
  return api.get(PROJECTS_URL)
}
