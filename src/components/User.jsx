import React from 'react'

export default function User() {


    let uName = "Gaurav";


    return (
        <div className='UserMainDiv flex-sb pad2'>

            <span>
                {uName}
            </span>
            <span className='UserImageDiv'>
                <img src="assets/editBtn.png" alt="editBtn" />
                <img src="assets/delBtn.png" alt="" />
            </span>

        </div>
    )
}
