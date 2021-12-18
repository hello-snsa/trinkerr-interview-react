import React, { useState } from 'react'
import DataCard from './DataCard'
import User from './User'
import data from "../user.json";
// import data from "../data.json";




export default function Midpart() {

    const [result, setResult] = useState(data);

    return (
        <div className='MidpartMainDiv'>
            <hr />

            <div ><User /> </div>

            <hr />

            <div>

                {
                    result.map((item, index) => {
                        let cData = item[0].split("::")
                        let cName = cData[0]
                        let cListing = cData[1];
                        let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);

                        return (
                            <div key={index} className={`company-list-${index}`}>

                                <DataCard cName={cName} cListing={cListing} item={item[1]} difference={difference} />
                            </div>
                        )
                    }
                    )}
            </div>

            <hr />


        </div>
    )
}
