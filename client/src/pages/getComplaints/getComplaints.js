import React from 'react'
import './getComplaints.scss'
export default function GetComplaints() {
    return (
        <div className="get_com">
            <div>Search: <input type="text" placeholder="Enter reference number"/> &nbsp;<button onClick="search_complaint">search</button> Or <button onClick="get_all_complaints">Get all complaints</button></div> <br/>
            <br/>
            <div className="results">
                Results:<br/>
            </div>
        </div>
    )
}
