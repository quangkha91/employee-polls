import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {handleLogin} from "../actions/authedUser";

const Login = ({dispatch, loggedIn}) => {
    const [username, setUsername] = useState("tylermcginnis");
    const [password, setPassword] = useState("abc321");

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div className="login-container" data-testid="login-container">
            <form onSubmit={handleSubmit}>
                <h2 className="title">Login</h2>        
                <hr className="title-line"/>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        value={username}
                        onChange={handleUsername}
                        type="text"
                        name="username"
                        id="username"
                        data-testid="username"
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        value={password}
                        onChange={handlePassword}
                        type="password"
                        name="password"
                        id="password"
                        data-testid="password"
                        required/>
                </div>
                <div className="form-group">             
                    <button type="submit" data-testid="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
