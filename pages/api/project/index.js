import { filterProjects } from 'redux/project/projectCrud'

export default async ({ query }, res) => {
  const response = await filterProjects(
    query.search_project,
    query.project_type,
    query.project_status,
    query.client,
    query.developer,
    query.designer,
    query.page,
    query.perPage,
    query.userType,
    query.userId,
  )
  res
    .status(200)
    .json({ data: response.data, totalData: response.headers['x-wp-total'] })
}
