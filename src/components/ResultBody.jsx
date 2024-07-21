import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getUserData, getTasteTypeData, incrementShareCount} from '../api/firebaseFunctions';
import heart from '../assets/heart.png';
import circle from '../assets/circle.png';
import {
    BodyContainer,
    TasteContainer,
    TextSection,
    ScoreContainer,
    MatchSection,
    MatchImage,
    Heart,
    LinkSection,
    LinkButton
} from './ResultBody.styles.js';
import {TasteTypeSection} from "./MatchResultBody.styles.js";
import {logEvent} from "firebase/analytics";
import {analytics} from "../api/firebase.js";
import {FaLink, FaUtensils} from "react-icons/fa";


const ResultBody = () => {
    const [userData, setUserData] = useState(null);
    const [tasteTypeData, setTasteTypeData] = useState(null);
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const data = await getUserData(userId);
                    setUserData(data);
                    const tasteTypeId = data.tasteType; // 사용자의 tasteType을 가져옴
                    const tasteTypeInfo = await getTasteTypeData(tasteTypeId);

                    // "!!"를 찾아서 한 번의 줄바꿈으로, "$$"를 찾아서 네 번의 줄바꿈으로 대체
                    const formattedDescription = tasteTypeInfo.tasteTypeDescription
                        .replace(/!!/g, '\n')
                        .replace(/\$\$/g, '\n\n');
                    setTasteTypeData({
                        ...tasteTypeInfo,
                        tasteTypeDescription: formattedDescription
                    });

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchData();
    }, [userId])

    const handleRecommendLink = () => {
        window.location.href = "https://eatty.waveon.me/";
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/matchHome?userIdA=${userId}`;
        navigator.clipboard.writeText(link)
            .then(async () => {
                alert("복사 완료 😋");
                await incrementShareCount(); // 공유 카운터 업데이트
                logEvent(analytics, 'share_link', { userId }); // 공유 이벤트 기록
            })
            .catch((error) => {
                console.error("Failed to copy link:", error);
                alert("링크 복사에 실패했습니다.");
            });
    };

    return (
        <BodyContainer>
            {userData && tasteTypeData ? (
                <>
                    <TasteContainer>
                        <LinkSection className="link_section">
                            <LinkButton className="link_button" onClick={handleCopyLink}>
                                우리의 입맛 궁합은 몇점? &nbsp; <FaLink />
                            </LinkButton>
                            <p>♡ 링크를 공유하면 친구와의 궁합을 볼 수 있어요 ♡</p>
                        </LinkSection>
                        <img src={tasteTypeData.tasteTypeImage} alt={tasteTypeData.tasteTypeName}></img>
                        <TasteTypeSection>
                            <h2 className="tasteType">{tasteTypeData.tasteTypeName}</h2>
                            <p className="subtitle">{tasteTypeData.tasteTypeSubtitle}</p>
                        </TasteTypeSection>
                        <TextSection>
                            <p>{tasteTypeData.tasteTypeDescription}</p>
                        </TextSection>

                    </TasteContainer>
                    <ScoreContainer>
                        <TextSection>
                            <h2 className="nickname_text">{userData.nickname} 님과 </h2>
                            <h2>친구와의 입맛 궁합 점수는?</h2>
                            <p className="score_text">??점</p>

                            <MatchSection>
                                <MatchImage src={tasteTypeData.tasteTypeCircleImage}></MatchImage>
                                <Heart src={heart}></Heart>
                                <MatchImage src={circle}></MatchImage>
                            </MatchSection>

                            <h2>오늘 뭐 먹을지 정하고 싶다면?</h2>
                            <h2>입맛 궁합을 보고 추천해드릴게요!</h2>

                            <LinkSection>
                                <LinkButton className="link_button" onClick={handleCopyLink}>
                                    친구 초대하고 입맛 궁합 보기  <FaLink />
                                </LinkButton>
                                <p>위 버튼을 눌러 복사한 링크를 친구에게 공유해보세요!</p>
                            </LinkSection>

                            <LinkSection>
                                <LinkButton onClick={handleRecommendLink}>
                                    우리 입맛에 딱 맞을 맛집은? &nbsp;<FaUtensils />
                                </LinkButton>
                                <p>위 버튼을 눌러 맛집 추천을 받아보세요!</p>
                            </LinkSection>
                        </TextSection>
                    </ScoreContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </BodyContainer>
    );
}

export default ResultBody;
