import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Button } from '@chakra-ui/react'


function Profile({history}) {

  const {user, logout} = useAuth()
 

  const handleLogout = async () => {
    logout(()=> {
      history.push('/')
    })
  }

  return (
    <div>
      Profile


      <br/>
      <br/>
      <code>
        {JSON.stringify(user)}
      </code>
       <br/>
       <br/>
      <Button colorScheme='blue' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile
