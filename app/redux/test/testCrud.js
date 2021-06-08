import api from 'api/restClient'

export const TEST_URL = 'api/test'

// CREATE =>  POST: add a new test to the server
export function createTest(test) {
  return api.post(TEST_URL, { test })
}

// READ
export function getAllTests() {
  return api.get(TEST_URL)
}

export function getTestById(testId) {
  return api.get(`${TEST_URL}/${testId}`)
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTests(queryParams) {
  return api.post(`${TEST_URL}/find`, { queryParams })
}

// UPDATE => PUT: update the test on the server
export function updateTest(test) {
  return api.put(`${TEST_URL}/${test.id}`, { test })
}

// UPDATE Status
export function updateStatusForTests(ids, status) {
  return api.post(`${TEST_URL}/updateStatusForTests`, {
    ids,
    status,
  })
}

// DELETE => delete the test from the server
export function deleteTest(testId) {
  return api.delete(`${TEST_URL}/${testId}`)
}

// DELETE Tests by ids
export function deleteTests(ids) {
  return api.post(`${TEST_URL}/deleteTests`, { ids })
}
