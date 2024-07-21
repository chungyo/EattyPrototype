import Header from "../components/Header.jsx";
import MatchResultBody from "../components/MatchResultBody.jsx";
import Retry from "../components/Retry.jsx";

const MatchResult = () => {
    return (
        <div>
            <Header/>
            <MatchResultBody />
            <Retry />
        </div>
    )
}

export default MatchResult