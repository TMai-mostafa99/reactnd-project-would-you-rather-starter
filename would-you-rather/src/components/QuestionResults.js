import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button , ProgressBar } from 'react-bootstrap'


export class QuestionResult extends Component {

handleClick = () => {
this.props.history.push('/');
}

render(){
    const{ question , user , users} = this.props;
    console.log("THE PROPSSSSSSS" , this.props);
    console.log("QUESTIONSSSSSSSSS  ", question)
    const option1Votes = question.optionOne.votes.length;
    const option2Votes = question.optionTwo.votes.length;
    const votesTotal = option1Votes + option2Votes ;
    const userVote = user.answers[question.id];

    return(
            <div>
            <div>Results:</div>
            <div> Would you rather</div>
            <img src = {users[question.author].avatarURL} alt ={`Avatar of ${question.author}`} className='avatar' ></img>
            <div> Asked by: {question.author}</div>

            <br></br>
            { userVote == 'optionOne' ?
            <div>
            <div>{question.optionOne.text}</div>
            <span> option1 : {option1Votes} out of {votesTotal}</span>
            <ProgressBar variant='success' now={(option1Votes / votesTotal)* 100} label={`${(option1Votes / votesTotal)* 100}%`} />
            <div>{question.optionTwo.text}</div>
            <span> option2 : {option2Votes} out of {votesTotal}</span>
            <ProgressBar now={(option2Votes / votesTotal)* 100} label={`${(option2Votes / votesTotal)* 100}%`} />
            <div> you chose {question.optionOne.text}</div>
            </div>
            : 
            <div>
            <div>{question.optionOne.text}</div>
            <span> option1 : {option1Votes} out of {votesTotal}</span>
            <ProgressBar now={(option1Votes / votesTotal)* 100} label={`${(option1Votes / votesTotal)* 100}%`} />
            <div>{question.optionTwo.text}</div>
            <span> option2 : {option2Votes} out of {votesTotal}</span>
            <ProgressBar variant='success' now={(option2Votes / votesTotal)* 100} label={`${(option2Votes / votesTotal)* 100}%`} />
            <div> you chose {question.optionTwo.text}</div>
            </div>
        
        
        }
         
            <Button  onClick={this.handleClick}>
                Back
             </Button>
             </div>
      
    )


}

}

function mapStateToProps({ users, questions , authedUser},props){
    // const { qid } = this.props
    // console.log(" THE QUESTION ISSSSSSSS :" , qid)
    // const question = questions[qid]
    //console.log(" THE QUESTION ISSSSSSSS :" , question)
    //const avatar = users[question.author].avatarURL
    const user = users[authedUser];
    return {
        user,
        users
    };
}

export default withRouter(connect(mapStateToProps)(QuestionResult))