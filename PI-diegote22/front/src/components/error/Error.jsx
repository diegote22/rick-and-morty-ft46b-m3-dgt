import React from 'react'
import { useEffect } from 'react'
import ErrorImg from '../error404.png'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate('/home'), 3000)
    }, [])
      
  return (
    <div>
      <img src={ErrorImg} alt='Error' />
    </div>
  )
}

export default Error;


