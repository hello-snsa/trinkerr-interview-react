
import React, { useEffect, useState } from 'react'

import { v4 as uuid } from 'uuid';
import axios from 'axios';
import data from "../data.json";
import user from "../user.json";
import PrintCard from './PrintCard';


export default function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [userData, setUserData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isTrue, setIsTrue] = useState(false);


    const handleSearch = () => {

        if (query.length >= 0) {
            let filteredData = data.filter((e) => {
                return e[0].toLowerCase().includes(query.toLowerCase());

            });
            console.log(filteredData.length)
            if (filteredData.length > 0) {
                setResult(filteredData);
                setFlag(false);

            } else {
                setFlag(true);
                // setResult(userData);
                getData();
                console.log("empty")
            }

        }
    };


    const getData = async () => {
        let newData = await axios.get("https://trinkerr-assignment-backend.herokuapp.com/wishlist");
        let data = newData.data;
        setResult(data);
        setUserData(data)

        // console.log("old", data)
    }

    useEffect(() => {

        getData();
    }, [])

    const handleAdd = async (e, item) => {
        let postData = await axios.post("https://trinkerr-assignment-backend.herokuapp.com/wishlist", { ...item });

        console.log("postDAta", postData.data)

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
        setIsAvailable(false);

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

            <div>{flag && <div>No Such Company Found</div>}</div>
            <div className="searchResultDiv">



                {

                    (!flag) && result.map((item, index) => {

                        let cData = item[0].split("::")
                        let cName = cData[0]
                        let cListing = cData[1];
                        let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);


                        const handleIn = (e, cName) => {

                            setIsHover(true);
                            e.currentTarget.className = " demoV printCardItem flex-sb";

                        }
                        const handleOut = (e, cName) => {
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

                                    {!isAvailable && <button

                                        id={cName}
                                        onClick={(e) => handleAdd(e, item)}

                                    >+ ADD</button>
                                    }
                                    {isAvailable && <button

                                        id={cName}
                                        onClick={() => handleDel(item)}

                                    >- Del</button>
                                    }







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
