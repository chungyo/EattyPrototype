import styled from "styled-components";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 가상 요소의 포지셔닝 기준 */
  padding-bottom: 15vh; /* 테두리와 내용물 사이의 간격 */

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
`;

export const TasteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative; /* 가상 요소의 포지셔닝 기준 */
  padding-bottom: 5vh; /* 테두리와 내용물 사이의 간격 */
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
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
    width: 100%;     // 너비는 컨테이너에 꽉 차게
    height: auto;    // 높이는 자동 조정
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
  @media (max-width: 768px) {
    font-size: 18px;
  }

`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap; /* 공백과 개행을 유지하며, 필요시 자동으로 줄바꿈 */

  .subtitle{
    font-size: 20px;
    font-family: PretendardSemiBold;
    margin-bottom: -0.5vh;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .nickname_text{
    margin-top: 10vh;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  h2{
    font-size: 24px;
    font-family: PretendardExtraBold;
    line-height: 0.05;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .tasteType{
    font-size: 40px;
    color: #039be5;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  p{
    font-size: 16px;
    line-height: 1.6;
    font-family: PretendardRegular;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  .score_text{
    font-size: 40px;
    font-family: PretendardExtraBold;
    margin-bottom: -1vh;
    margin-top: 1vh;

    @media (max-width: 768px) {
      font-size: 30px;
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
  margin-top: 2vh;
  
  &.link_section{
    margin-top: -2vh;
    margin-bottom: 3vh;
  }

  p{
    font-size: 13px;
    color: black;
    padding: 0px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
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

