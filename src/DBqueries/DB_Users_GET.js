import axios from 'axios'
import gql from 'graphql-tag'
import {print} from 'graphql'

function DB_Users_GET (params) {

  const GET_USERS = gql`
    query getUsers($first: Int, $orderBy: UserOrderByInput) {
      getUsers (first: $first, orderBy: $orderBy)
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
  
  return axios({
    url: process.env.REACT_APP_DB_SERVER,
    method: 'post',
    data: {
      query: print(GET_USERS),
      variables: {
        first: params.first,
        orderBy: params.orderBy
      }
    },
  })
  .then( result => {
    return (result.data.data.getUsers) 
  })
  .catch(error => {
    alert(error)
  })
}

export default DB_Users_GET
