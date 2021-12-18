
import React, { useEffect, useState } from 'react';
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

    useEffect = (() => {
        // handleSearch()
    }, [query])

    return (
        <div className='searchMainDiv'>
            <div>
                <label>
                    <input
                        type="text" className="search-input"
                        placeholder="Search stocks..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)

                            handleSearch()
                        }
                        }

                    />
                </label>

            </div>
            <div>{flag && <div>No Such Company</div>}</div>
            <div className="searchResultDiv">

                {(!flag && query !== "") && <PrintCard data={result} />
                }
            </div>
        </div>
    );
}



