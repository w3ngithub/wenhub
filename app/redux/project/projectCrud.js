import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Sectionu
const paginate = (page = 1, perPage = 20) =>
  `${API_URL}/projects?page=${page}&per_page=${perPage}&_fields=id,title,link,excerpt,author,acf_fields,_links&_embed`

export function getProjects(page, perPage) {
  return api.get(paginate(page, perPage))
}

// Filtering Section

const projectType = (
  search_project,
  project_type,
  project_status,
  client,
  developer,
  designer,
  page = 1,
  perPage = 20,
) =>
  `${API_URL}/projects?${
    search_project?.length > 0 ? `&search=${search_project}` : ''
  }&page=${page}&per_page=${perPage}${
    project_type ? `&project_type=${project_type}` : ''
  }${project_status ? `&project_status=${project_status}` : ''}${
    client ? `&client=${client}` : ''
  }${developer ? `&developer=${developer}` : ''}${
    designer ? `&designer=${designer}` : ''
  }&_fields=id,title,link,excerpt,author,acf_fields,_links&_embed`

export function filterProjects(
  project_type,
  project_status,
  client,
  developer,
  designer,
  page,
  perPage,
) {
  return api.get(
    projectType(
      project_type,
      project_status,
      client,
      developer,
      designer,
      page,
      perPage,
    ),
  )
}
