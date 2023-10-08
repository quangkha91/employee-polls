import {connect} from "react-redux";

const Leaderboard = ({users}) => {
    return (
        <div>
            <h1 className="title">Leaderboard</h1>
            <hr className="title-line"/>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                { users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <span className="font-bold">{user.name}</span>
                            <br/>{user.id}
                        </td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);
