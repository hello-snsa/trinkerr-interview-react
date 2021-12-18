import React from 'react'

export default function DataCard({ cName, cListing, item, difference }) {

    console.log("con", cName, cListing, item, difference)
    return (
        <div className='DataCardMainDiv flex-sb pad2'>

            <div className='flex-c'>
                <div>name{cName}</div>
                <div>list{cListing}</div>
            </div>
            <div className='flex-c'>
                <div>itme{item}</div>
                <div style={{ color: difference > 0 ? "green" : "red" }}>dif{difference}</div>
            </div>





        </div >
    )
}
