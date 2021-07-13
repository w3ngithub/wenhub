import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Sectionu
const fetchProject = (page = 1, perPage = 20) =>
  `${API_URL}/projects?page=${page}&per_page=${perPage}&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`

export function getProjects(page, perPage) {
  return api.get(fetchProject(page, perPage))
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
  `${API_URL}/projects?page=${page}&per_page=${perPage}${
    search_project?.length > 0 ? `&search=${search_project}` : ''
  }${project_type ? `&project_type=${project_type}` : ''}${
    project_status ? `&project_status=${project_status}` : ''
  }${client ? `&client=${client}` : ''}${
    developer ? `&developer=${developer}` : ''
  }${
    designer ? `&designer=${designer}` : ''
  }&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`

export function filterProjects(
  search_project,
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
      search_project,
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
