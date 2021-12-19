
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

    // const handleIn = () => {
    //     setIsHover(true)
    // }
    // const handleOut = () => {
    //     setIsHover(false)
    // }

    const handleAdd = (e) => {
        console.log(user)
        // let userData = user;
        // console.log(e);
        // userData.push(e);
        // user = userData;
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

                        // const [isHover, setIsHover] = useState(false);
                        // let temp2=React.useRef();



                        let temp = false;
                        const handleIn = (e) => {
                            console.log("in")
                            setIsHover(true)
                            temp = true;
                            // e.target.style.className = "demoV";
                            // e.target.style.visibility = "visible";
                            e.target.style.button.color = "red";

                        }
                        const handleOut = (e) => {
                            console.log("out")
                            setIsHover(false)
                            temp = false;
                            // e.target.style.visibility = "hidden";
                            e.target.style.button.color = "green";
                            // e.target.style.className = "demoH";

                        }



                        return (
                            <div key={index} className={`company-list-${item[index]}`}>

                                <div className={"printCardItem flex-sb"} onMouseOver={(e) => handleIn(e)
                                }
                                    onMouseOut={(e) => handleOut(e)}

                                >
                                    {/* <div className='printCardItem flex-sb ' onMouseOver={() => handleIn()} onMouseLeave={() => handleOut()}

                                > */}

                                    {/* left side */}
                                    <span className='flex-c '>
                                        <span className={difference > 0 ? "green cName" : "cName red"} >{cName}</span>
                                        <span className='cListing'>{cListing}</span>
                                    </span>

                                    {/* mid */}
                                    {/* <button className={isAvailable ? " hidden showOnHover" : "showOnHover"} */}
                                    <button

                                        // style={{ visibility: isHover ? "visible" : "hidden" }}
                                        onClick={() => handleAdd(item)}
                                    >+ ADD</button>
                                    <button className={isAvailable ? "hidden showOnHover" : "showOnHover"}

                                        onClick={() => handleDel(item)}





                                    > - Del</button>

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
