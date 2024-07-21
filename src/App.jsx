import './App.css'
import {Route, Routes, Link, useNavigate} from "react-router-dom";
import {db} from "./api/firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Home from './pages/Home'
import MyResult from "./pages/MyResult.jsx";
import Notfound from "./pages/Notfound.jsx";
import MatchResult from "./pages/MatchResult.jsx";
import {useEffect, useState} from "react";
import Questions from "./pages/Questions.jsx";
import MatchQuestions from "./pages/MatchQuestions.jsx";
import MatchHome from "./pages/MatchHome.jsx";



function App() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(items);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/matchHome" element={<MatchHome />}/>
                <Route path="/questions" element={<Questions />}/>
                <Route path="/matchquestions" element={<MatchQuestions />}/>
                <Route path="/myresult" element={<MyResult/>}/>
                <Route path="/matchresult" element={<MatchResult/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </>
    )
}

export default App
