import {connect} from "react-redux";
import {handleLogout} from "../actions/authedUser";
import AvatarIcon from '../icons/AvatarIcon';
const Header = ({dispatch, authedUserId}) => {

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    };

    return(<header>
        <h2 className="app-title">Employee Polls</h2>
        <div className="user-info">
            <AvatarIcon/>
            <p>{authedUserId}</p>
            <button className="logout-button" onClick={logout} data-testid="logout-button">Logout</button>
        </div>
    </header>);
}

const mapStateToProps = ({authedUser}) => ({
    authedUserId: authedUser.id,
});


export default connect(mapStateToProps)(Header);