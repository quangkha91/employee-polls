import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewPoll from "./components/NewPoll";
import PollPage from "./components/PollPage";
import {connect} from "react-redux";
import Login from "./components/Login";
import {handleInitialData} from "./actions/shared";
import Leaderboard from "./components/Leaderboard";
import Error404 from "./components/404";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(handleInitialData());
    });

    return (
        <main>
            {loggedIn && <Sidebar/>}
            <section className="content">
                {loggedIn && <Header/>}
                <div className='main-content'>
                    <Routes>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                        <Route path="/leaderboard" exact element={<PrivateRoute><Leaderboard/></PrivateRoute>}/>
                        <Route path="/questions/:id" element={<PrivateRoute><PollPage/></PrivateRoute>}/>
                        <Route path="/new" exact element={<PrivateRoute><NewPoll/></PrivateRoute>}/>
                        <Route path="/404" exact element={<Error404/>}/>
                    </Routes>
                </div>
            </section>
        </main>
    );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
