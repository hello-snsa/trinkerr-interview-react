import React, { useEffect, useState } from 'react'
import DataCard from './DataCard'
import User from './User'
// import data from "../../user.json";
import data from "../user.json";
import PrintCard from './PrintCard';
import axios from 'axios';
// import data from "../data.json";




export default function Midpart() {

    const [result, setResult] = useState([]);


    async function getData() {
        let newData = await axios.get("https://trinkerr-assignment-backend.herokuapp.com/wishlist");
        let data = newData.data;
        setResult(data)
        // console.log("old", data)

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
