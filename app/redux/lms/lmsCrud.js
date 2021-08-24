import api from 'api/restClient'
import { API_URL } from 'constants/constants'

export function getLmsLeave(page, perPage, id) {
  return api.get(
    `${API_URL}/lms_leave?page=${page}&per_page=${perPage}&filter[meta_key]=wen_leave_user_relation&filter[meta_value]=${id}&_fields=id,meta,title,content,leave_status,leave_type`,
  )
}

export function getLmsAdminLeave(page, perPage, leaveStatus) {
  return api.get(
    `${API_URL}/lms_leave?leave_status=${leaveStatus}&page=${page}&per_page=${perPage}&_fields=id,meta,title,content,leave_status,leave_type,_links&_embed`,
  )
}

export function postLmsLeave(data) {
  return api.post(`${API_URL}/lms_leave`, data, true)
}

export function getLmsFaq() {
  return api.get(`${API_URL}/lms/faq`)
}

export function getLmsArchiveTypes() {
  return api.get(`${API_URL}/leave_archives?_fields=id,count,name`)
}

export function getLmsArchives(userId, page, perPage, archives) {
  return api.get(
    `${API_URL}/lms_leave?filter[meta_key]=wen_leave_user_relation&filter[meta_value]=${userId}&leave_archives=${archives}&page=${page}&per_page=${perPage}&status=draft&_fields=id,meta,leave_type,content`,
    true,
  )
}

export function cancelApproveLeave(leaveId, data) {
  return api.put(
    `${API_URL}/lms_leave/${leaveId}?_fields=id,meta,title,content,leave_status,leave_type,_links&_embed`,
    data,
    true,
  )
}
