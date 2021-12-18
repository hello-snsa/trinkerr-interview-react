
import React, { useState } from 'react';
import data from "../data.json";
import PrintCard from './PrintCard';

export default function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [flag, setFlag] = useState(false);

    const handleSearch = () => {
        let filteredData = data.filter((e) => {
            return e[0].toLowerCase().includes(query.toLowerCase());

        });
        if (filteredData.length > 0) {
            setResult(filteredData);
            setFlag(false);
        } else {
            setFlag(true);
        }
    };

    return (
        <div className='searchMainDiv'>
            {/* <div> */}
            {/* <label> */}
            <input
                type="text" className="searchBox"
                placeholder="Search stocks..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)

                    handleSearch()
                }} />
            {/* </label> */}
            {/* <button className="search-button" onClick={handleSearch}>Search</button> */}
            {/* </div> */}
            <div>{flag && <div>No Such Company</div>}</div>
            <div className="searchResultDiv">



                {
                    (!flag && query !== "") && result.map((item, index) => {

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
                    })
                }
            </div>
        </div>
    )



}
