import React, { Component, Fragment } from 'react'
import {connect } from 'react-redux'
import { Form, Button, Container, Row , Col} from 'react-bootstrap'

class Home extends Component {
    state = 
    {
        unanswered : true
    }

    toQuestion = (e ,id) => {
        e.preventDefault()
        this.props.history.push(`/question/${id}`)
    }

    unansweredList () {
        let unanswered = true
        this.setState({ unanswered})
    }
    answeredList () {
        let unanswered = false
        this.setState({ unanswered})
    }
    render(){  
        const { answered , unanswered , users } = this.props
        return (
            <Fragment>
                <Button variant="outline-primary" onClick={this.unansweredList.bind(this)}> Unanswered questions</Button>
                <Button variant="outline-primary" onClick={this.answeredList.bind(this)}> answered questions</Button>


            <Container>
                <Row>
            {
            this.state.unanswered  ?

                <ul className='unanswered-list'>
                    
                    {
                    unanswered.map((question) => (
                    <li key={question.id}>
                        <Col>
                        <img src = {users[question.author].avatarURL} alt ={`Avatar of ${question.author}`} className='avatar' ></img>
                        </Col>
                        <Col>
                        <div className='tweet-info'>
                            <div>
                                <span> {question.author} asks:</span>
                                <br></br>
                                <div> {question.optionOne.text} OR .... </div>
                                <button className='btn'
                                onClick={(e) => this.toQuestion(e, question.id)} > View Poll</button>
                            </div>
                        </div>
                        </Col> 
                    </li>
                ))}
                </ul>
                
            :
            <ul className='answered-list'>
                {answered.map((question) => (
                    <li key={question.id}>
                        <Col>
                        <img src = {users[question.author].avatarURL} alt ={`Avatar of ${question.author}`} className='avatar' ></img>
                        </Col>
                        <Col>
                        <div className='tweet-info'>
                            <div>
                                <span> {question.author} asks:</span>
                                <br></br>
                                <div> {question.optionOne.text} OR .... </div>
                                <button className='btn'
                                onClick={(e) => this.toQuestion(e, question.id)} > View Poll</button>
                            </div>
                        </div>
                        </Col> 
                    </li>
                ))}
                </ul>            
            }
            </Row>
            </Container>
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser, users ,questions }){
    
    const answeredIDs= Object.keys(users[authedUser].answers);
    

    const answered = Object.values(questions)
    .filter(question => answeredIDs.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

    const unanswered = Object.values(questions)
    .filter(question => !answeredIDs.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);


    return{ 
       answered,
       unanswered,
       users

    }
}
export default connect(mapStateToProps)(Home)