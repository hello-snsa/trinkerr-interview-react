
import React, { useState } from 'react';
import data from "../data.json";
import PrintCard from './PrintCard';

export default function Search({ cName, cListing, item, difference }) {
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
            <div>
                <label>
                    <input
                        type="text" className="searchBox"
                        placeholder="Search stocks..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)

                            handleSearch()
                        }
                        }

                    />
                </label>
                {/* <button className="search-button" onClick={handleSearch}>Search</button> */}
            </div>
            <div>{flag && <div>No Such Company</div>}</div>
            <div className="searchResultDiv">

                {/* {(!flag && query !== "") && <PrintCard data={data} /> */}
                {/* // {(!flag && query !== "") && <PrintCard cName={cName} cListing={cListing} item={item[1]} difference={difference} /> */}

                {(!flag && query !== "") && result.map((item, index) => {

                    let cData = item[0].split("::")
                    let cName = cData[0]
                    let cListing = cData[1];
                    let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);

                    return (
                        <div key={index} className={`company-list-${item[index]}`}>


                            <div >
                                <h3 className='printSearch flex-sb'>
                                    <span>{cName}</span>
                                    <span>{cListing}</span>
                                    <span>{item[1]}</span>
                                    <span
                                        style={{ color: difference > 0 ? "green" : "red" }}
                                    >

                                        {difference}
                                    </span></h3>

                            </div>

                        </div>
                    );
                })}
            </div>

        </div>

    );
}



