import React, { useEffect, useState } from 'react'
import User from './User'
import PrintCard from './PrintCard';
import axios from 'axios';





export default function Midpart() {

    const [result, setResult] = useState([]);


    async function getData() {
        let newData = await axios.get("https://trinkerr-assignment-backend.herokuapp.com/wishlist");
        let data = newData.data;
        setResult(data)

    }
    useEffect(() => {

        getData();
    }, [])




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
