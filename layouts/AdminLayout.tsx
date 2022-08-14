import React, { ReactElement } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


interface IProps {
    children: ReactElement
}

const AdminLayout = ({ children }: IProps): ReactElement => {
    return (
        <>
            <div className="pageContent">
                <Header type='admin' />
                    { children }
                <Footer />
            </div>
        </>
    )
}

export default AdminLayout