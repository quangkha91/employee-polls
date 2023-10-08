import {connect} from "react-redux";

const Error404 = () => {
    return (
        <div>
            <h1 className="title">Error 404</h1>
            <h2>Page not found</h2>
        </div>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Error404);
