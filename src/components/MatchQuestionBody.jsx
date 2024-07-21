import React, {useState, useEffect} from 'react';
import {
    SurveyContainer,
    SurveyHeader,
    SurveyContent,
    Answers,
    AnswerButton,
    ImgContainer,
} from './QuestionBody.styles.js';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Slide.css';
import {useLocation, useNavigate} from "react-router-dom";
import {updateUserTasteTypeStack, updateUserTasteType, registerUser} from '../api/firebaseFunctions';
import {fetchImageURL} from '../api/firebaseStorage';

const questions = [
    {
        question: "활기찬 아침, 어떤 아침을 드실 건가요?",
        image: 'questions/question1.png',
        answers: [
            {text: "든든한 아침 식사로 밥과 국물 한 그릇 🍚", types: [7, 3]},
            {text: "가볍고 간단하게 시리얼 한 그릇 🥣", types: [1, 2]}
        ]
    },
    {
        question: "점심시간! 어떤 음식을 선택하시겠어요?",
        image: 'questions/question2.png',
        answers: [
            {text: "백반집에서 든든한 한 끼 🤤", types: [3, 4]},
            {text: "패스트푸드점에서 햄버거 세트 🥴", types: [1, 5]}
        ]
    },
    {
        question: (
            <>
                점심 먹고 돌아오는 길, <br/>카페에서 어떤 음료를 선택하시겠어요?
            </>
        ),
        image: 'questions/question3.png',
        answers: [
            {text: "깔끔한 아메리카노 한잔 ☕️", types: [7, 5]},
            {text: "달달한 크림 라떼로 당충전 🥤", types: [2, 1]}
        ]
    },
    {
        question: "디저트도 같이 주문할까요?",
        image: 'questions/question4.png',
        answers: [
            {text: "달달한 케이크 한 조각 나눠먹기 🍰", types: [2, 1]},
            {text: "점심 먹었는데 디저트까지? 너무 배불러 😕", types: [7, 4]}
        ]
    },
    {
        question: (
            <>
                금세 출출해진 당신,<br/>어떤 간식으로 허기를 달랠까요?
            </>
        ),
        image: 'questions/question5.png',
        answers: [
            {text: "짭짤한 감자칩 🍘", types: [3, 6]},
            {text: "달달한 초코칩 쿠키 🍪", types: [2, 1]}
        ]
    },
    {
        question: (
            <>
                저녁을 먹을 참인데,<br/>새로 오픈한 음식점이 눈에 띄네요!
            </>
        ),
        image: 'questions/question6.png',
        answers: [
            {text: "새로 오픈한 음식점에서 한번 먹어볼까? 🏃", types: [5, 6]},
            {text: "새로 생겼네.. 나중에 와봐야겠다 🙂‍", types: [3, 4]}
        ]
    },
    {
        question: (
            <>
                친구가 새로운 음식점을 추천해줬습니다.<br/>어떤 음식을 선택하시겠어요?
            </>
        ),
        image: 'questions/question7.png',
        answers: [
            {text: "깊은맛이 느껴지는 짭짤한 일본식 라멘! 🍜", types: [0, 6]},
            {text: "이국적인 인도의 커리 요리 🥘", types: [7, 5]}
        ]
    },
    {
        question: "늦은 밤 야식으로 무엇을 먹을까요?",
        image: 'questions/question8.png',
        answers: [
            {text: "역시 야식은 치킨이닭! 🍗", types: [6, 0]},
            {text: "간단하게 과일과 요거트로 마무리 🥝", types: [7, 2]}
        ]
    },
    {
        question: "주말 아침, 가족들과 함께 식사를 하려 합니다. 어떤 식당을 갈까요?",
        image: 'questions/question9.png',
        answers: [
            {text: "가족끼리 오붓하게 집밥 🏠", types: [4, 0]},
            {text: "오랜만에 기분전환겸 외식 🧑‍🍳", types: [5, 3]}
        ]
    },
    {
        question: (
            <>
                주말 저녁, 친구들과 약속이 있네요.<br/>어디로 갈까요?
            </>
        ),
        image: 'questions/question10.png',
        answers: [
            {text: "새로 오픈한 타코 전문점 🌮", types: [5, 1]},
            {text: " 늘 가던 매운 짬뽕집 🌶️", types: [6, 0]}
        ]
    },
    {
        question: (
            <>
                저녁에는 한 잔 하자고 하네요.<br/>어디로 갈까요?
            </>
        ),
        image: 'questions/question11.png',
        answers: [
            {text: "치맥집에서 시원한 맥주 한잔 🍺", types: [0, 3]},
            {text: "매운 닭발에 소주 한잔 🍶", types: [6, 4]}
        ]
    },
    {
        question: "어제 술자리의 여파가 아직 끝나지 않았어요. 어떤 방식으로 속을 풀어볼까요?",
        image: 'questions/question12.png',
        answers: [
            {text: "뜨끈한 국밥으로 해장 🍲", types: [0, 4]},
            {text: "샐러드와 건강 주스로 해장 🧃", types: [7, 2]}
        ]
    },
];

const MatchQuestionBody = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [tasteTypeStack, setTasteTypeStack] = useState(new Array(8).fill(0));
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const userIdA = new URLSearchParams(location.search).get('userIdA');
    const nickname = new URLSearchParams(location.search).get('nickname');

    const [userIdB, setUserIdB] = useState("");

    useEffect(() => {
        const registerUserB = async () => {
            if (!nickname) {
                console.error("Nickname is missing from URL parameters.");
                return;
            }

            const userData = {
                nickname: nickname,
                answers: [],
                tasteTypeStack: new Array(8).fill(0),
                tasteType: "",
            };

            try {
                const docId = await registerUser(userData);
                setUserIdB(docId);
                // URL에 userIdB를 추가
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('userIdB', docId);
                window.history.replaceState(null, '', newUrl.toString());
            } catch (error) {
                console.error("Failed to register user B:", error);
            }
        };

        registerUserB();
    }, [nickname]);

    useEffect(() => {
        fetchImage();
    }, [currentQuestionIndex]);

    const fetchImage = async () => {
        setLoading(true);
        try {
            const url = await fetchImageURL(questions[currentQuestionIndex].image);
            setImageURL(url);
            setLoading(false);
        } catch (error) {
            console.error("Error loading image:", error);
            setLoading(false);
        }
    };

    const handleAnswerClick = async (answer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answer.text;
        setUserAnswers(updatedAnswers);

        const updatedTasteTypeStack = [...tasteTypeStack];
        answer.types.forEach(type => {
            updatedTasteTypeStack[type]++;
        });
        setTasteTypeStack(updatedTasteTypeStack);

        try {
            await updateUserTasteTypeStack(userIdB, updatedTasteTypeStack);
        } catch (error) {
            console.error("Failed to update user tasteTypeStack:", error);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const maxCount = Math.max(...updatedTasteTypeStack);
            const maxIndices = updatedTasteTypeStack
                .map((count, index) => ({count, index}))
                .filter(item => item.count === maxCount)
                .map(item => item.index);

            const randomMaxTasteType = maxIndices[Math.floor(Math.random() * maxIndices.length)];

            try {
                await updateUserTasteType(userIdB, randomMaxTasteType);
            } catch (error) {
                console.error("Failed to update user B tasteType:", error);
            }
            navigate(`/matchResult?userIdA=${userIdA}&userIdB=${userIdB}`, {replace: true});
        }
    };

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };


    return (
        <>
            <SurveyHeader>
                <div className="header_left">
                    <AnswerButton className="back-button" onClick={handleBackClick}>&lt;</AnswerButton>
                </div>
                <div className="header_center">
                    {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="header_right"></div>
            </SurveyHeader>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={currentQuestionIndex}
                    timeout={500}
                    classNames="slide"
                >
                    <SurveyContainer>
                        <SurveyContent>
                            <ImgContainer>
                                {loading ? (
                                    <div className="loading-text">Loading...</div> // 로딩 인디케이터
                                ) : (
                                    <img src={imageURL} alt="Question"/>
                                )}
                            </ImgContainer>
                            <p>{questions[currentQuestionIndex].question}</p>
                            <Answers>
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <AnswerButton
                                        key={index}
                                        onClick={() => handleAnswerClick(answer)}
                                    >
                                        {answer.text}
                                    </AnswerButton>
                                ))}
                            </Answers>
                        </SurveyContent>
                    </SurveyContainer>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
};

export default MatchQuestionBody;
