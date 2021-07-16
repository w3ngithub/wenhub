import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Sectionu
const fetchProject = `${API_URL}/projects?page=1&per_page=20&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`

export function getProjects() {
  return api.get(fetchProject)
}

// Filtering Section

function filterProject(
  searchProject,
  projectType,
  projectStatus,
  client,
  developer,
  designer,
  page = 1,
  perPage = 20,
) {
  return `${API_URL}/projects?page=${page}&per_page=${perPage}${
    searchProject?.length > 0 ? `&search=${searchProject}` : ''
  }${projectType ? `&project_type=${projectType}` : ''}${
    projectStatus ? `&project_status=${projectStatus}` : ''
  }${client ? `&client=${client}` : ''}${
    developer ? `&developer=${developer}` : ''
  }${
    designer ? `&designer=${designer}` : ''
  }&_fields=id,title,link,slug,excerpt,author,acf_fields,_links&_embed`
}

export function filterProjects(
  searchProject,
  projectType,
  projectStatus,
  client,
  developer,
  designer,
  page,
  perPage,
) {
  return api.get(
    filterProject(
      searchProject,
      projectType,
      projectStatus,
      client,
      developer,
      designer,
      page,
      perPage,
    ),
  )
}
