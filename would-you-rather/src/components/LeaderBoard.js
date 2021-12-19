import React, { Component, Fragment } from 'react';
import {connect } from 'react-redux'

export class Leaderboard extends Component {

    render(){
        const {leaderboardData} = this.props;
        return(
            <Fragment>
                <ul>
                {
                    leaderboardData.map((user,idx)=>(
                        <li key={user.id}>
                        <Fragment>
                        <img className='avatar' alt="user pic" src={user.avatar} />
                        <b> {user.name }</b>
                        
                        <div>Answered questions: {user.answerCount} </div>              
                        <div>Created questions:  {user.questionCount}</div> 
                        <div>Total score:  {user.questionCount + user.answerCount}</div>
                       

                        </Fragment>
                        </li>
                       
                    ))
                }
                </ul>
            </Fragment>


        )
    }

}





function mapStateToProps({users}){
    const leaderboardData = Object.values(users)
    .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
   return {
    leaderboardData
    };
}



export default connect(mapStateToProps)(Leaderboard);