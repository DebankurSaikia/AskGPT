import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

import "../App.css";

const Home = () => {
    return (
        <div className="app">
            <Sidebar />
            <ChatWindow />
        </div>
    );
};

export default Home;