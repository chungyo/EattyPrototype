import './HomeBody.css';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mainPhoto from '../assets/mainPhoto.png';
import { getUserData } from '../api/firebaseFunctions';

const MatchHomeBody = () => {
    const [nickname, setNickname] = useState("");
    const [userANickname, setUserANickname] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userIdA = new URLSearchParams(location.search).get('userIdA');

    useEffect(() => {
        const fetchUserAData = async () => {
            try {
                const userAData = await getUserData(userIdA);
                setUserANickname(userAData.nickname);
            } catch (error) {
                console.error("Error fetching user A data:", error);
            }
        };

        if (userIdA) {
            fetchUserAData();
        }
    }, [userIdA]);

    const handleStartTest = () => {
        if (!nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        navigate(`/matchQuestions?userIdA=${userIdA}&nickname=${nickname}`, { replace: true });
    }

    return (
        <div className="HomeBody">
            <h2 className="main_text">
                <p>{userANickname} 님이 초대한</p>
                <p> 입맛 궁합 테스트</p>
            </h2>
            <div className="subtext">
                <p>우리의 ‘입맛 궁합’을 테스트 하고,</p>
                <p>오늘 먹을 메뉴까지 한 번에 정해보세요!</p>
            </div>
            <div className="home_image">
                <img src={mainPhoto} alt="main" />
            </div>
            <div className="input_section">
                <input
                    className="input_name"
                    placeholder="닉네임 입력"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <div className="button_section">
                    <button
                        className="start_button"
                        onClick={handleStartTest}>
                        테스트 시작하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MatchHomeBody;
