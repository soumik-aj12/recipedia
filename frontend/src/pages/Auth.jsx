import React from 'react'
import {Login} from '../components/Login'
import {Register} from '../components/Register'

export const Auth = () => {
  return (
    <div className='flex justify-evenly m-14'>
      <Login/>
      <Register/>
    </div>
  )
}
