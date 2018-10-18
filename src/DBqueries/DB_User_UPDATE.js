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
    `mutation {
      updateUser (
        where: {id: "cjmvf5gum001i0830vhcy2af6"}
        data: {firstName: "Alice"} 
      )
      {
        id 
        firstName
      }
    }
    `
  )
}

export default DB_User_UPDATE