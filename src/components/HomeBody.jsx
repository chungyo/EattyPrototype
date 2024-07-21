import './HomeBody.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from '../api/firebaseFunctions.js';
import mainPhoto from '../assets/mainPhoto.png';

const HomeBody = () => {
    const [nickname, setNickname] = useState("");
    const nav = useNavigate();

    const onClickStartTest = async () => {
        if (!nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        const userData = {
            nickname: nickname,
            answers: [],
            tasteTypeStack: [0],
            tasteType: "",
        };

        try {
            const docId = await registerUser(userData);
            // 사용자 등록 성공 시, 질문 페이지로 이동. 사용자 ID를 쿼리 파라미터로 전달
            nav(`/questions?userId=${docId}`, {replace: true});
        } catch (error) {
            console.error("Failed to register user:", error);
            alert("사용자 등록에 실패했습니다. 다시 시도해주세요.");
        }
        console.log(userData);
    }

    return (
        <div className="HomeBody">
            <h2 className="main_text">
                <p>입맛 궁합 테스트,</p>
                <p>우리 입맛 궁합은 몇 점일까?</p>
            </h2>
            <div className="subtext">
                <p>우리의 ‘입맛 궁합’을 테스트 하고,</p>
                <p>오늘 먹을 메뉴까지 한 번에 정해보세요!</p>
            </div>
            <div className="home_image">
                <img src={mainPhoto}/>
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
                        onClick={onClickStartTest}>
                        테스트 시작하기
                    </button>
                </div>
            </div>

        </div>
    );
}

export default HomeBody;
