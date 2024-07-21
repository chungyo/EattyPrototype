import styled from 'styled-components';


export const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -4vh;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px 0; // 상하 패딩 추가
  }
`;


export const SurveyHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 요소 사이의 간격을 균일하게 */
  width: 100%;
 

  .header_left {
    flex: 1; /* 모든 헤더 파트가 같은 공간을 차지하도록 설정 */
    display: flex;
    justify-content: flex-start; /* 왼쪽 요소를 왼쪽 끝에 배치 */
  }

  .header_center {
    flex: 2; /* 중앙 요소가 더 큰 공간을 차지하도록 설정 */
    display: flex;
    justify-content: center; /* 숫자를 정중앙에 배치 */
    align-items: center;
    font-size: 17px; /* 폰트 크기 조정 */
  }

  .header_right {
    flex: 1; /* 오른쪽 요소도 왼쪽 요소와 동일한 공간을 차지하도록 설정 */
    visibility: hidden; /* 오른쪽 요소는 보이지 않도록 설정 */
  }

  @media (max-width: 768px) {
    .header_left, .header_center, .header_right {
      font-size: 14px; /* 모바일에서 폰트 크기 조정 */
    }
  }
`;




export const SurveyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  height: 100%;

  p {
    font-size: 25px;
    margin-bottom: 60px;
    font-family: PretendardExtraBold;
  }

  @media (max-width: 768px) {
    width: 90%;
    p {
      font-size: 18px; // 텍스트 크기 조정
      margin-bottom: 30px; // 마진 줄임
    }
  }
`;


export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh; // 고정된 최소 높이
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 90%;
    height: auto;
  }

  @media (max-width: 768px) {
    min-height: 30vh; // 모바일에서 최소 높이 조정
  }
`;

export const Answers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 10px; // 간격 줄임
  }
`;

export const AnswerButton = styled.button`
  display: flex;
  align-items: center; // 세로 정렬을 중앙으로 설정합니다.
  justify-content: center; // 가로 정렬을 중앙으로 설정합니다.
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: white;
  color: black;
  border-radius: 20px;
  width: 100%;
  height: 8vh;
  border: 2px solid #373737;
  text-align: center;
  &:hover {
    background-color: #C7484A;
    color: white;
    border: none;
  }

  @media (max-width: 768px) {
    font-size: 16px; // 모바일에서 폰트 사이즈 조정
    height: 6vh; // 모바일에서 높이 조정
  }
  .button:active {
    background-color: #C7484A; // 터치 시 변경될 배경색
    color: white; // 터치 시 변경될 글자색
  }

  &.back-button {
    width: 25px; // back 버튼의 너비를 25px로 설정
    height: 25px; // back 버튼의 높이를 25px로 설정
    padding: 0; // 패딩 제거
    border-radius: 100%; // 완전한 원형으로 테두리 반경 조정
    font-size: 18px; // back 버튼 내의 폰트 사이즈 조정
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
`;


