import {connect} from "react-redux";
import {Link} from "react-router-dom";
import noAvailable from '../icons/noAvailable.png';

const Card = ({question, author}) => {
    return (
      <div className="card">
          <div className="container">
            <div className="container-img">
              {(author?.avatarURL) ? <img src={author?.avatarURL} alt="Author" /> : <img src={noAvailable} alt="avatar" />}              
            </div>                  
              <h4>{question.author}</h4> 
              <p>{new Date(question.timestamp).toDateString()}</p>
              <Link to={'./questions/' + question.id}><button className="detail-button">Detail</button></Link>
          </div>
      </div>
    );
}

export default connect()(Card);