import { filterProjects } from 'redux/project/projectCrud'

export default async (
  {
    query: {
      search_project,
      project_type,
      project_status,
      client,
      developer,
      designer,
      page,
      perPage,
    },
  },
  res,
) => {
  const response = await filterProjects(
    search_project,
    project_type,
    project_status,
    client,
    developer,
    designer,
    page,
    perPage,
  )
  res
    .status(200)
    .json({ data: response.data, totalData: response.headers['x-wp-total'] })
}
