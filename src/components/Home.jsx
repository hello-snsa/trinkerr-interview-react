import React from 'react'
import Footer from './Footer'
import Midpart from './Midpart'
import Search from './Search'

export default function Home() {
    return (
        <div className='HomeMainDiv'>
            <Search />
            <Midpart />
            <div className='footers'>

                <Footer />
            </div>



        </div>
    )
}
