import React from 'react';
import Search from './Search';


export default function PrintCard({ data }) {


    return (
        <div className='printCardMainDiv'>

            <Search data={data} />


        </div>
    )
}
