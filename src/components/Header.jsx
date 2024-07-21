import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteUser, getUserData } from '../api/firebaseFunctions';
import logo from "../assets/logo.png";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');
    const userIdA = new URLSearchParams(location.search).get('userIdA');
    const userIdB = new URLSearchParams(location.search).get('userIdB');
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const fetchUserType = async () => {
            if (userIdB) {
                try {
                    const userData = await getUserData(userIdB);
                    setUserType(typeof userData.tasteType === 'string');
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            } else if (userId) {
                try {
                    const userData = await getUserData(userId);
                    setUserType(typeof userData.tasteType === 'string');
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        fetchUserType();
    }, [userId, userIdB]);

    const onClickLogo = async () => {
        if (userType && userIdB) {
            try {
                await deleteUser(userIdB);
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        } else if (userType && userId) {
            try {
                await deleteUser(userId);
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        }

        if (userIdA) {
            navigate(`/matchHome?userIdA=${userIdA}`, { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <header className="Header">
            <div className="header_center">
                <img src={logo} onClick={onClickLogo} alt="Logo" />
            </div>
        </header>
    );
}

export default Header;
