import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export const fetchUsers = (limit = 12) =>
  api
    .get('/users', {
      params: {
        limit,
        select: 'firstName,lastName,maidenName,email,username,image,phone,age,company',
      },
    })
    .then((res) => res.data.users)

export const fetchUserById = (id) =>
  api.get(`/users/${id}`).then((res) => res.data)

export function getErrorMessage(error) {
  if (error?.code === 'ECONNABORTED' || /timeout/i.test(error?.message || '')) {
    return 'The request timed out. Please try again.'
  }
  if (error?.response) {
    return `Something went wrong (status ${error.response.status}). Please try again.`
  }
  return 'Network error. Please check your connection and try again.'
}