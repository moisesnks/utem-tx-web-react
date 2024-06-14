// Dashboard.jsx
import React from "react";
import Wallet from "./Wallet.jsx";
import Markets from "./Markets.jsx";
import SocialConnect from "./SocialConnect.jsx";
import ProfileResume from "./ProfileResume.jsx";
import Noticias from "./Noticias.jsx";

import mockupWallet from "../mockups/wallet.js";
import mockupUsers from "../mockups/users.js";
import mockupNoticias from "../mockups/noticias.js";

const Dashboard = ({ user }) => {
    return (
        <div className="p-4 flex flex-col gap-6 flex-grow max-w-screen-xl mx-auto" >
            <ProfileResume user={user} />
            <Wallet wallet={mockupWallet} />
            <Markets />
            <div className=" flex flex-row flex-wrap justify-between gap-4">
                <SocialConnect users={mockupUsers} />
                <Noticias noticias={mockupNoticias} />
            </div>
        </div >
    );

};

export default Dashboard;
