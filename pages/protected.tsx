import { NextPage } from 'next'
import React from 'react'
import AuthRoute from '../routes/AuthRoute'

const Protected: NextPage = (): JSX.Element => {

  return (
    <h1>This page is Protected</h1>
  )
}

export default AuthRoute(Protected)