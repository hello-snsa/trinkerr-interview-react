import React, { useEffect, useState } from 'react'
import axios from 'axios';
import data from "../data.json";
import User from './User';


export default function Search() {
    const [query, setQuery] = useState("");
    const [userData, setUserData] = useState([]);
    const [result, setResult] = useState([]);

    const [flag, setFlag] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);


    const handleSearch = (e) => {
        setIsAvailable(false);

        let newQuery = e.target.value;
        setQuery(e.target.value)
        if (newQuery.length >= 1) {
            let filteredData = data.filter((e) => {
                return e[0].toLowerCase().includes(query.toLowerCase());

            });
            if (filteredData.length > 0) {

                setResult(filteredData);
                setFlag(false);

            } else {
                setFlag(true);


            }

        } else {
            getData();
            setIsAvailable(true);

        }
    };


    const getData = async () => {
        let newData = await axios.get("https://trinkerr-assignment-backend.herokuapp.com/wishlist");
        let data = newData.data;
        setResult(data);
        setUserData(data);
    }

    useEffect(() => {

        getData();

    }, [])

    const handleAdd = async (e, item) => {
        let isPresent = false;
        let count = 1;

        for (let i = 0; i < userData.length; i++) {
            if (item[0] === userData[i][0]) {
                isPresent = true;
            }
        }
        if (!isPresent && count < 2) {
            let postData = await axios.post("https://trinkerr-assignment-backend.herokuapp.com/wishlist", { ...item });

            count++;
            alert("added successfully in your wishlist")

        } else {
            alert("already added in your wishlist");
        }
    }

    const handleDel = async (item) => {

        let postData = await axios.delete(`https://trinkerr-assignment-backend.herokuapp.com/wishlist/${item.id}`,);

        getData();


    }



    return (
        <div className='searchMainDiv'>


            <input
                type="text" className="searchBox"
                placeholder="Search stocks..."
                value={query}
                onChange={(e) => {

                    handleSearch(e)
                }} />

            <div>{flag && <div><h1>No Such Company Found</h1></div>}</div>

            <div className="searchResultDiv">

                {/* If searching is not in use */}
                {
                    query === "" ? (<> <User /> <hr /></>) : ""

                }

                {/* If we are searching stocks */}
                {

                    (!flag) && result.map((item, index) => {

                        let cData = item[0].split("::")
                        let cName = cData[0]
                        let cListing = cData[1];
                        let difference = (((item[1] - item[2]) / item[2]) * 100).toFixed(2);


                        const handleIn = (e, cName) => {

                            e.currentTarget.className = " demoV printCardItem flex-sb";

                        }
                        const handleOut = (e, cName) => {

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

                                    >+ Add</button>
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
