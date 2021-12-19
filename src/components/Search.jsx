
import React, { useRef, useState } from 'react';
import data from "../data.json";
import user from "../user.json";
import PrintCard from './PrintCard';


export default function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isTrue, setIsTrue] = useState(false);


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

    const handleAdd = (e) => {
        console.log(user)
        user.push(e)
        console.log(user)

    }

    const handleDel = (item) => {

        console.log("user", user)

        user = user.filter((e) => {
            let userData = [];
            if (e[0] != item[0]) {
                userData.push(e);
                return userData;


            }
        })
        console.log("user", user)

    }



    return (
        <div className='searchMainDiv'>


            <input
                type="text" className="searchBox"
                placeholder="Search stocks..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)

                    handleSearch()
                }} />

            <div>{flag && <div>No Such Company</div>}</div>
            <div className="searchResultDiv">



                {

                    (!flag && query !== "") && result.map((item, index) => {

                        let cData = item[0].split("::")
                        let cName = cData[0]
                        let cListing = cData[1];
                        let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);


                        const handleIn = (e, cName) => {
                            console.log("in", e)
                            console.log("in", cName)
                            setIsHover(true);
                            // document.getElementById(cName).add
                            e.currentTarget.className = " demoV printCardItem flex-sb";

                        }
                        const handleOut = (e, cName) => {
                            console.log("out", e)
                            console.log("out", cName)
                            setIsHover(false);

                            e.currentTarget.className = " demoH printCardItem flex-sb";

                        }



                        return (
                            <div key={index} className={'SearchItem'}>

                                <div className={"printCardItem flex-sb demoH"}
                                    onMouseOver={(e) => handleIn(e, cName)
                                    }
                                    onMouseOut={(e) => handleOut(e, cName)}

                                >


                                    {/* left side */}
                                    <span className='flex-c '>
                                        <span className={difference > 0 ? "green cName" : "cName red"} >{cName}</span>
                                        <span className='cListing'>{cListing}</span>
                                    </span>

                                    {/* mid */}

                                    <button

                                        id={cName}
                                        onClick={() => handleAdd(item)}

                                    >+ ADD</button>

                                    {/* 
                                    <button className={isAvailable ? "hidden showOnHover" : "showOnHover"}

                                        onClick={() => handleDel(item)}

                                    > - Del</button> */}

                                    {/* <button
                                        style={{ color: isTrue ? "green" : "red" }}

                                    >Demo</button> */}



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
        </div >
    )



}
