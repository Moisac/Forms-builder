import React, { ReactElement } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


interface IProps {
    children: ReactElement
}

const SiteLayout = ({ children }: IProps): ReactElement => {
    return (
        <>
            <div className="pageContent">
                <Header type='site'/>
                    { children }
                <Footer />
            </div>
        </>
    )
}

export default SiteLayout