
import React from "react";
import Followers from "./Followers.jsx";
import Followed from "./Followed.jsx";
import Role from "./Role.jsx";
import Uid from "./Uid.jsx";
import Avatar from "./Avatar.jsx";
import Name from "./Name.jsx";

const ProfileResume = ({ user }) => {
    const displayName = user?.displayName ?? "";
    const uid = user?.uid ?? "default-uid";
    const verified = user?.verified ?? false;
    const photoURL = user?.photoURL ?? "";
    const role = user?.role ?? "guest";
    const followers = user?.followers ?? 0;
    const following = user?.following ?? 0;
    const name = displayName || `Anonymus-User-${uid.slice(0, 6)}`;

    return (
        <div className="flex flex-rol gap-4 p-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg items-center">
            <Avatar photoURL={photoURL} />
            <div className="flex flex-col md:flex-row flex-wrap gap-10 mt-4 md:mt-0">
                <Name name={name} verified={verified} />
                <Uid uid={uid} />
                <Role role={role} />
                <Followed following={following} />
                <Followers followers={followers} />
            </div>
        </div>
    );
};

export default ProfileResume;