import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Sectionu
const fetchProject = `${API_URL}/projects?page=1&per_page=20&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`

export function getProjects() {
  return api.get(fetchProject)
}

// Filtering Section

function filterProject(
  search_project,
  project_type,
  project_status,
  client,
  developer,
  designer,
  page = 1,
  perPage = 20,
) {
  return `${API_URL}/projects?page=${page}&per_page=${perPage}${
    search_project?.length > 0 ? `&search=${search_project}` : ''
  }${project_type ? `&project_type=${project_type}` : ''}${
    project_status ? `&project_status=${project_status}` : ''
  }${client ? `&client=${client}` : ''}${
    developer ? `&developer=${developer}` : ''
  }${
    designer ? `&designer=${designer}` : ''
  }&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`
}

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
    filterProject(
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
