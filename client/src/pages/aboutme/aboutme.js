import React from 'react';
import { useContext } from "react";
import { User } from '../../context/user.context';
import './aboutme.scss'
function Aboutme(props) {
    const { web3, accounts, contract } = useContext(User);
    const getMyComplaints = async () => {

        try {
           let my_complaints= await contract.methods
                .getMyComplaints()
               .call({from:accounts[0]});
            // console.log(my_complaints);
            return my_complaints;

        } catch (error) {
            if (window.confirm("Error Found")) {
                window.location.reload();
            }
        }
    };

    if (!web3) {
        return (
            <>
                <div>You need to login using metamask.</div>
            </>
        );
    } else {
        let my_complaints = getMyComplaints();
        // let my_complaints_size = my_complaints.size();
        
        console.log(my_complaints[0]);
        
        return (
            <div className="aboutme">
                <div> Account ID: {accounts[0]}</div>
                <div>My Complaints: </div>
            </div>
        )
    }
}


export default Aboutme;

