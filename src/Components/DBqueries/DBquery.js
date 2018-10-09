const getUserListQuery = {
    query: 
    `query {
        getUsers
        {
          firstName
          lastName
          address
          phone
        }
      }
    `
  }

  export default getUserListQuery