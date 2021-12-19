import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import QuestionResults from './QuestionResults';
import { Form, Button, Container, Row , Col} from 'react-bootstrap'
import { handleQuestionAnswer } from '../actions/users'

class Question extends Component {
 
   
state = {
    choice : '' ,
    answered : false
}

changeChoice(new_choice){
    console.log("Input choice: " , new_choice)
        let choice = new_choice
        this.setState({ choice });
        //console.log("choice :" ,this.state.choice)
      }

handleSubmit = e => {
    e.preventDefault();
    if (this.state.choice !== '') {
    const { authedUser, question, handleQuestionAnswer } = this.props;
    console.log("IN HANDLE SUBMITTTT  :" ,  this.state.choice )
    handleQuestionAnswer(authedUser, question.id, this.state.choice);
    //this.checkIFAnswered();
    let answered = true ;
    this.setState({answered})
    console.log("THE AUTHED USER ANSWERED THIS QUESTION " , answered)
  
    
    
    }
      };

render(){
    const { question , id , users  , authedUser , answeredBefore} = this.props
    //console.log("THE QUESTION STATE ISSSSS " , this.state.answered)
    //this.checkIFAnswered();
    var disabled = true;
    if(this.state.choice === 'optionOne' || this.state.choice === 'optionTwo')
        disabled = false;
    return(
        <Fragment>
            { ! answeredBefore.includes(authedUser)  ?
                <div>
                <img
                src = {users[question.author].avatarURL}
                alt ={`Avatar of ${question.author}`}
                className='avatar'
                ></img>
                <div className='not-tweet-info'>
                    <div>
                        <b> {question.author} asks:</b>
                        <div className='question-info'>
                           <span> Would you rather ..?</span>
                           <br></br>

                            <div>
                            <input type="radio" 
                            value= "optionOne"
                            checked={this.state.choice === "optionOne"} 
                            onChange={()=>this.changeChoice("optionOne")}/>
                            {question.optionOne.text}
                            <br></br>
                            
                            <input type="radio" value="optionTwo" checked={this.state.choice === "optionTwo"} onChange={()=>this.changeChoice("optionTwo")}/>{question.optionTwo.text}
                            </div>
                            
                            <button disabled={disabled} className='btn' onClick={this.handleSubmit.bind(this)}> Submit </button>
                               
                        </div>
                    </div>
                </div>
    </div>
    :
    <QuestionResults {...this.props}/>}
        
    </Fragment>
    )
}

}

function mapStateToProps({ authedUser , questions, users } , props){
    const { id } = props.match.params

    const question = questions[id]
    const answeredBefore = question.optionOne.votes.concat(question.optionTwo.votes)
   // console.log("ANSWERSSSS " , answeredBefore)
    return{
        
        authedUser,
        question,
        id,
        users,
        answeredBefore

    }
}

export default withRouter(connect(mapStateToProps , {handleQuestionAnswer})(Question)) 
 