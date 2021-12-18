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




                        <div className='printCardItem flex-sb '>

                            {/* left side */}
                            <span className='flex-c '>
                                <span className={difference > 0 ? "green cName" : "cName red"} >{cName}</span>
                                <span className='cListing'>{cListing}</span>
                            </span>

                            {/* Right side */}
                            <span className='flex-c'>

                                <span className={difference > 0 ? "green price" : "price red"} >{item[1]}</span>

                                {/* Right Bottom */}

                                <span className='differenceSpan flex '>

                                    <img src="assets/upArrow.png" alt="up arrow" className={difference > 0 ? "visible" : "hidden"} />
                                    <img src="assets/downArrow.png" alt="down arrow" className={difference > 0 ? "hidden" : "visible"} />

                                    <span className='difference' >{difference}</span>

                                    <span className='percentage'> %</span>
                                </span>
                            </span>
                        </div>

                        <hr />
                    </div>

                );
            })}
        </div>
    )
}
