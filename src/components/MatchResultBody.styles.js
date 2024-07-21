import styled from "styled-components";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


`;

export const TasteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative; /* 가상 요소의 포지셔닝 기준 */
  padding-bottom: 10px; /* 테두리와 내용물 사이의 간격 */

  &::after {
    content: ''; /* 가상 요소에는 content 속성이 필수 */
    position: absolute;
    bottom: 0; /* 컨테이너 하단에 위치 */
    left: 50%; /* 중앙 정렬을 위해 왼쪽에서 50% 떨어진 곳에 위치 */
    transform: translateX(-50%); /* 중앙 정렬의 정확도를 높이기 위해 */
    width: 25%; /* 테두리의 '길이'를 컨테이너의 50%로 설정 */
    border-bottom: 5px solid #C7484A; /* 테두리 스타일 지정 */
    height: 1px; /* 높이를 지정하여 둥근 테두리 효과를 더 잘 보이게 함 */
    background-color: #C7484A; /* 배경 색상을 테두리 색상으로 설정 */
    border-radius: 10px; /* 둥근 테두리를 생성 */
  }

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; // 너비는 컨테이너에 꽉 차게
    height: auto; // 높이는 자동 조정
    max-width: 100%; // 최대 너비 제한
    max-height: 60%; // 뷰포트 높이의 50%로 최대 높이 제한
    object-fit: contain; // 이미지 비율을 유지하면서 컨테이너 내부에 맞춤
  }
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap; /* 공백과 개행을 유지하며, 필요시 자동으로 줄바꿈 */

  .nickname_text {
    margin-top: 8vh;
    margin-bottom: -2vh;
  }

  h2 {
    font-size: 24px;
    font-family: PretendardExtraBold;
    line-height: 0.1;
  }

  .tasteType {
    font-size: 40px;
    color: #039be5;

  }

  p {
    font-size: 16px;
    line-height: 1.6;
    font-family: PretendardRegular;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  .score_text {
    font-size: 40px;
    font-family: PretendardExtraBold;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
`;

export const TasteTypeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 80%;
  max-width: 100%;
  max-height: 100%;
  border-bottom: 2px solid #BDBDBD;
  margin-bottom: 3vh;

  .tasteType {
    font-size: 40px;
    font-family: PretendardExtraBold;
    color: black;
    margin-bottom: -10px;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  .subtitle {
    font-size: 20px;
    font-family: PretendardSemiBold;
    color: #696969;

    @media (max-width: 768px) {
      font-size: 16px;
    }

  }


`;

export const MatchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 요소 사이의 간격을 고르게 배치 */
  text-align: center;
  width: 75%;
  max-width: 100%;
  height: 30vh;
  margin-bottom: 4vh;

  @media (max-width: 768px) {
    height: auto; /* 모바일에서는 높이를 자동으로 조정 */
    flex-direction: row; /* 모바일에서도 가로 정렬 */
  }

`;

export const MatchCommentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  max-width: 100%;


`;

export const MatchImage = styled.img`
  width: 40%; /* 각 이미지의 너비를 고정 */
  height: auto;
  max-height: 100%; /* 최대 높이를 MatchSection의 높이에 맞춤 */
  object-fit: contain; /* 이미지 비율 유지하며 컨테이너에 맞춤 */

  @media (max-width: 768px) {
    width: 40%; /* 모바일에서는 너비를 더 작게 조정 */
    margin-bottom: 0; /* 모바일에서는 이미지 간격 조정 제거 */
  }
`;

export const Heart = styled.img`
  width: 20%; /* 하트 이미지의 너비를 줄임 */
  height: auto;
  max-height: 100%; /* 최대 높이를 MatchSection의 높이에 맞춤 */
  object-fit: contain; /* 이미지 비율 유지하며 컨테이너에 맞춤 */

  @media (max-width: 768px) {
    width: 20%; /* 모바일에서는 너비를 더 작게 조정 */
    margin: 0; /* 모바일에서는 이미지 간의 간격 조정 제거 */
  }
`;

export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  max-height: 100%;

  position: relative; /* 가상 요소의 포지셔닝 기준 */
  padding-bottom: 5vh; /* 테두리와 내용물 사이의 간격 */

  &::after {
    content: ''; /* 가상 요소에는 content 속성이 필수 */
    position: absolute;
    bottom: 0; /* 컨테이너 하단에 위치 */
    left: 50%; /* 중앙 정렬을 위해 왼쪽에서 50% 떨어진 곳에 위치 */
    transform: translateX(-50%); /* 중앙 정렬의 정확도를 높이기 위해 */
    width: 25%; /* 테두리의 '길이'를 컨테이너의 50%로 설정 */
    border-bottom: 5px solid #C7484A; /* 테두리 스타일 지정 */
    height: 1px; /* 높이를 지정하여 둥근 테두리 효과를 더 잘 보이게 함 */
    background-color: #C7484A; /* 배경 색상을 테두리 색상으로 설정 */
    border-radius: 10px; /* 둥근 테두리를 생성 */
  }

  &.link_section{
    margin-top: -2vh;
    margin-bottom: 3vh;
  }

  p {
    font-size: 12px;
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const LinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  width: 80%;
  height: 10vh;
  border-radius: 10px;
  border: none;
  margin-top: 40px;
  cursor: pointer;

  &.recommend_link {
    border-radius: 50px;
    color: white;
    background-color: #C7484A;
  }
  
  
  &.link_button{
    border-radius: 50px;
    color: white;
    background-color: #C7484A;
  }

  &:hover{
    background-color: #C7484A;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    width: 70%;
    height: 6vh;
  }
`;

export const MenuSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
`;

export const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(199, 72, 74, 0.5);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 30vh;

  @media (max-width: 768px) {
    height: auto; // 모바일에서는 높이를 자동 조정
    padding: 10px;
  }
`;

export const MenuImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 80%; // 모바일에서는 이미지 너비를 조금 줄임
    margin-bottom: 5px;
  }
`;

export const MenuText = styled.div`
  margin-top: 3vh;

  h2 {
    line-height: 1;
    text-align: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 16px; // 모바일에서는 폰트 크기를 조정
      margin-bottom: 10px;
    }
  }
`;




