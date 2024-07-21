import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {getUserData, getTasteTypeData, getMatchData, incrementShareCount} from '../api/firebaseFunctions';
import heart from '../assets/heart.png';
import {
    BodyContainer,
    TasteContainer,
    TextSection,
    ScoreContainer,
    MatchSection,
    MatchImage,
    Heart,
    LinkSection,
    LinkButton,
    MenuImage,
    MenuSection,
    MenuText,
    TasteTypeSection, MatchCommentSection, MenuCard
} from './MatchResultBody.styles.js';
import {FaLink, FaUtensils} from "react-icons/fa";
import {logEvent} from "firebase/analytics";
import {analytics} from "../api/firebase.js";

const MatchResultBody = () => {
    const [userAData, setUserAData] = useState(null);
    const [userBData, setUserBData] = useState(null);
    const [userATasteTypeData, setUserATasteTypeData] = useState(null);
    const [userBTasteTypeData, setUserBTasteTypeData] = useState(null);
    const [matchData, setMatchData] = useState(null);

    const location = useLocation();
    const userIdA = new URLSearchParams(location.search).get('userIdA');
    const userIdB = new URLSearchParams(location.search).get('userIdB');

    useEffect(() => {
        const fetchData = async () => {
            if (userIdA && userIdB) {
                try {
                    // 사용자 A의 데이터 가져오기
                    const dataA = await getUserData(userIdA);
                    setUserAData(dataA);

                    const tasteTypeIdA = dataA.tasteType;
                    const tasteTypeInfoA = await getTasteTypeData(tasteTypeIdA);

                    // 사용자 B의 데이터 가져오기
                    const dataB = await getUserData(userIdB);
                    setUserBData(dataB);

                    const tasteTypeIdB = dataB.tasteType;
                    const tasteTypeInfoB = await getTasteTypeData(tasteTypeIdB);

                    // 사용자 B의 tasteTypeDescription 포맷팅
                    const formattedDescriptionB = tasteTypeInfoB.tasteTypeDescription
                        .replace(/!!/g, '\n')
                        .replace(/\$\$/g, '\n\n');

                    setUserATasteTypeData(tasteTypeInfoA);
                    setUserBTasteTypeData({
                        ...tasteTypeInfoB,
                        tasteTypeDescription: formattedDescriptionB
                    });

                    // 매치 데이터 가져오기
                    const matchInfo = await getMatchData(tasteTypeIdA, tasteTypeIdB);

                    // 매치 데이터의 comment 포맷팅
                    const formattedComment = matchInfo.comment
                        .replace(/!!/g, '\n')
                        .replace(/\$\$/g, '\n\n');

                    setMatchData({
                        ...matchInfo,
                        comment: formattedComment
                    });

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [userIdA, userIdB]);

    const handleCopyLink = () => {
        const link = `${window.location.origin}/matchHome?userIdA=${userIdB}`;
        navigator.clipboard.writeText(link)
            .then(async () => {
                alert("복사 완료 😋");
                await incrementShareCount(); // 공유 카운터 업데이트
                logEvent(analytics, 'share_link', { userIdB }); // 공유 이벤트 기록
            })
            .catch((error) => {
                console.error("Failed to copy link:", error);
                alert("링크 복사에 실패했습니다.");
            });
    };

    const handleRecommendLink = () => {
        window.location.href = "https://eatty.waveon.me/";
    };

    return (
        <BodyContainer>
            {userAData && userBData && userATasteTypeData && userBTasteTypeData && matchData ? (
                <>
                    <TasteContainer>
                        <LinkSection className="link_section">
                            <LinkButton className="recommend_link" onClick={handleRecommendLink}>
                                우리 둘만의 맛집이 궁금하다면?  &nbsp; <FaUtensils />
                            </LinkButton>
                            <p>♡ 링크를 클릭하면 둘만의 맛집을 추천 받을 수 있어요 ♡</p>
                        </LinkSection>
                        <img src={userBTasteTypeData.tasteTypeImage} alt={userBTasteTypeData.tasteTypeName}></img>
                        <TasteTypeSection>
                            <h2 className="tasteType">{userBTasteTypeData.tasteTypeName}</h2>
                            <p className="subtitle">{userBTasteTypeData.tasteTypeSubtitle}</p>
                        </TasteTypeSection>
                        <TextSection>
                            <p>{userBTasteTypeData.tasteTypeDescription}</p>
                        </TextSection>
                    </TasteContainer>
                    <ScoreContainer>
                        <TextSection>
                            <h2 className="nickname_text">{userAData.nickname}님과</h2>
                            <h2 className="nickname_text">{userBData.nickname}님과의 입맛 궁합 점수는?</h2>
                            <p className="score_text">{matchData.score}점</p>

                            <MatchSection>
                                <MatchImage src={userATasteTypeData.tasteTypeCircleImage}></MatchImage>
                                <Heart src={heart}></Heart>
                                <MatchImage src={userBTasteTypeData.tasteTypeCircleImage}></MatchImage>
                            </MatchSection>
                            <MatchCommentSection>
                                <p className="match_text">{matchData.comment}</p>
                            </MatchCommentSection>

                            <LinkSection>
                                <LinkButton onClick={handleCopyLink}>
                                    다른 친구와는 몇점일까? &nbsp; <FaLink />
                                </LinkButton>
                                <p>♡ 링크를 공유하면 친구와의 궁합을 볼 수 있어요 ♡</p>
                            </LinkSection>

                            <MenuText>
                                <h2>우리 입맛 궁합에 딱 맞는</h2>
                                <h2>오늘의 추천 메뉴는?</h2>
                            </MenuText>

                            <MenuSection>
                                {matchData.menus.map((menu, index) => (
                                    <MenuCard key={index}>
                                        <MenuImage src={menu.image} alt={menu.name}/>
                                        <MenuText>{menu.name}</MenuText>
                                    </MenuCard>
                                ))}
                            </MenuSection>
                            <LinkSection>
                                <LinkButton className="recommend_link" onClick={handleRecommendLink}>
                                    우리 입맛에 딱 맞을 맛집은? &nbsp; <FaUtensils />
                                </LinkButton>
                                <p>!! 위 버튼을 눌러 맛집 추천을 받아보세요 !!</p>
                            </LinkSection>
                        </TextSection>
                    </ScoreContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </BodyContainer>
    );
};

export default MatchResultBody;
