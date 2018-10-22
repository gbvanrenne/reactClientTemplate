import axios from 'axios'
import {print} from 'graphql'
import gql from 'graphql-tag'

function DB_User_UPDATE (params) {

  const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $data: UserUpdateInput! ) {
      updateUser(id: $id, data: $data) {
        id
        firstName
        lastName
        balance_18L
        balance_11L
        balance_01L
      }
    }
  `

  return axios({
    url: process.env.REACT_APP_DB_SERVER,
    method: 'post',
    data: 
    {
      query: print( UPDATE_USER ),
      variables:
      {
        id: params.id,
        data: {...params.data}
      }
    }
  })
  .then( result => {
    return ( {err: null, rc: result.data.data.updateUser} ) 
  })
  .catch(error => {
    console.log(error)
    return (error)
  })
}

export default DB_User_UPDATE