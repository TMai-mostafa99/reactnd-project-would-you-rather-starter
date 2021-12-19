import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

import { handleSaveQuestion } from '../actions/questions';

export class NewQuestion extends Component{

    state = {
        validSubmit : false,
        option1: '',
        option2: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id] : e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {authedUser , handleSaveQuestion } = this.props
        const {option1 , option2 } = this.state;

        new Promise((res , rej) => {
            handleSaveQuestion(option1 , option2 , authedUser);
            setTimeout(() => res('success') , 1000);

        }).then(()=> {
            this.setState({
                option1: '',
                option2: ''
            });
            this.setState({validSubmit : true});
        })

    }

    render(){
        const disabled = this.state.option1 === '' || this.state.option2 === '';
        if(this.state.validSubmit === true){
            return<Redirect to="/" />
        } 
        return(
            <div>
                <span> Create a new Question</span>
                <br></br>
                <p> Would you rather... </p>
                <Form onSubmit={this.handleSubmit}>
                    <input id="option1"
                    value={this.state.option1}
                    onChange={this.handleChange}
                    required
                    ></input>

                    <br/>
                    <br/>
                    <input id="option2"
                        value={this.state.option2}
                        onChange={this.handleChange}
                        required
                    ></input>
                    <br></br>
                    <br></br>
                    <Button type='submit' disabled={disabled}>
                       Submit
                    </Button>
                
                
                </Form>


                

            </div>



        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser
    };
  }

export default connect( mapStateToProps , {handleSaveQuestion})(NewQuestion);