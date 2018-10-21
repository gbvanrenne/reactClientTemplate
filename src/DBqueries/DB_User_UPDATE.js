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
    alert(error)
    console.log(error)
  })


  // return axios.post(process.env.REACT_APP_DB_SERVER,
  //   { 
  //     query: print(UPDATE_USER),
  //     variables: {
  //       id: params.id,
  //       data: {firstName: "George"}}
  //   }
  // )
  // .then( result => {
  //   return {err: null, rc: result.data.data.updateUser}
  // })
  // .catch( e => {
  //   console.log(e)
  // })
}

export default DB_User_UPDATE