import React, { useState } from 'react'
import DataCard from './DataCard'
import User from './User'
import data from "../user.json";
import PrintCard from './PrintCard';
// import data from "../data.json";




export default function Midpart() {

    const [result, setResult] = useState(data);

    return (
        <div className='MidpartMainDiv'>
            <hr />

            <div ><User /> </div>


            <div>
                <hr />
                <PrintCard data={result} />
            </div>



        </div>
    )
}
