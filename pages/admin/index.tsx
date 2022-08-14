import React from 'react'
import { NextPage } from 'next'
import AuthRoute from '../../routes/AuthRoute'
import AdminLayout from '../../layouts/AdminLayout'

const Admin: NextPage = (): JSX.Element =>{
  return (
    <AdminLayout>
        <div>index</div>
    </AdminLayout>
  )
}

export default AuthRoute(Admin)
