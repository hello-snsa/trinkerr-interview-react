import React, { useState } from 'react';


export default function PrintCard({ data }) {


    const [result, setResult] = useState(data);

    return (
        <div className='printCardMainDiv'>



            {result.map((item, index) => {

                let cData = item[0].split("::")
                let cName = cData[0]
                let cListing = cData[1];
                let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);

                return (
                    <div key={index} className={`company-list-${item[index]}`}>

                        <hr />


                        <div className='printCardItem flex-sb pad2'>

                            <span className='flex-c '>
                                <span className='cName' style={{ color: difference > 0 ? "rgb(41, 197, 193)" : "rgb(231, 89, 46)" }}>{cName}</span>
                                <span className='cListing'>{cListing}</span>
                            </span>

                            <span className='flex-c'>
                                <span>
                                </span>
                                <span className='price' style={{ color: difference > 0 ? "rgb(41, 197, 193)" : "rgb(231, 89, 46)" }} >{item[1]}</span>

                                <span>
                                    <img src="assets/upArrow.png" alt="up arrow" />

                                    <span className='difference' >{difference}</span>

                                    <span className='percentage'> %</span>
                                </span>
                            </span>
                        </div>

                    </div>
                    // </div>


                );
            })}
        </div>
    )
}
