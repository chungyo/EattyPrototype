import logo from "../assets/reverseLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
    RetryContainer,
    RetryImg,
    RetryButton
} from './Retry.styles.js';


const Retry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userIdA = new URLSearchParams(location.search).get('userIdA');
    const userIdB = new URLSearchParams(location.search).get('userIdB');

    // 다시하기 버튼 클릭 시, 닉네임 입력 페이지로 이동
    const onClickRetry = () => {
        if (userIdA && userIdB) {
            navigate(`/matchHome?userIdA=${userIdA}`); // matchHome 페이지로 이동
        } else {
            navigate("/"); // 홈 페이지로 이동 (닉네임 입력 페이지)
        }
    };

    return (
        <RetryContainer>
            <RetryImg>
                <img src={logo} alt="Logo" />
            </RetryImg>
            <RetryButton onClick={onClickRetry}>
                입맛 유형 테스트 다시하기
            </RetryButton>
        </RetryContainer>
    );
}

export default Retry;
