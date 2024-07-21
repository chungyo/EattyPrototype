import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header.jsx";
import Retry from "../components/Retry.jsx";
import ResultBody from "../components/ResultBody.jsx";

const MyResult = () => {

    return (
        <div>
            <Header />
            <ResultBody />
            <Retry />
        </div>
    );
}

export default MyResult;