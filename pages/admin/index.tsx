import React from 'react'
import { NextPage } from 'next'
import AuthRoute from '../../routes/AuthRoute'
import AdminLayout from '../../layouts/AdminLayout'
import FormsList from '../../components/FormsList'

const Admin: NextPage = (): JSX.Element => {
  return (
    <AdminLayout>
        <div>
          <FormsList />
        </div>
    </AdminLayout>
  )
}

export default AuthRoute(Admin)
