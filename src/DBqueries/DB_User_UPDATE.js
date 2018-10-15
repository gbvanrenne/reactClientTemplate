import axios from 'axios'

function DB_User_UPDATE (params) {

  const queryStr = getUserListQuery(params)

  return axios({
    url: 'http://172.16.0.10:4001',
    method: 'post',
    data: {query: queryStr},
  })
    .then( result => {
      return (result.data.data.getUsers) 
    })
    .catch(error => {
      alert(error)
    })
}

const getUserListQuery = (queryParams) => {
  return (
    `query {
        getUsers ${queryParams}
        {
          id
          firstName
          lastName
          address
          city
          province
          postalCode
          phone
          email
        }
      }
    `
  )
}

export default DB_User_UPDATE