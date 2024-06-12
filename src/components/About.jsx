// src/components/About.js

import { useLoaderData } from "react-router-dom";


const About = () => {

    const data = useLoaderData();

    return (
        <div>
            <h1>About Page</h1>
            <p>{data.info}</p>
        </div>
    );
};

export default About;
