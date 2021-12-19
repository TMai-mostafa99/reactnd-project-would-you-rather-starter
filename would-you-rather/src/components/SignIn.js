import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Form, Button, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';



class SignIn extends Component{
    state = {
        // user : this.props.users[0].id, //wrong logic
        user : '',
        submitted : false
    };

   onChange = ( e ) => {
       //const user = e.target.value
       this.setState(() => ({
           [e.target.name] : e.target.value
       }))
   };

   handleSubmit= e => {
       e.preventDefault();
       const { setAuthedUser } = this.props
       const authUser = this.state.user;
       console.log("THE AUTHED USER IS : " , authUser)
      
       new Promise((res, rej) => {
           setTimeout(() => res() , 500);
       }).then(() => setAuthedUser(authUser));
       //this.props.history.push('/')
       //return <Redirect to="/" />
       let submitted = true;
       this.setState({submitted})
   }

   render(){
       const { users } = this.props
       console.log("USERRR : " , this.state.user)
       var disabled = false;
       if(this.state.user === '') disabled = true

      if(this.state.submitted)
      return <Redirect to="/" />

      
       return(

        <Form  onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>WELCOME !</Form.Label>
            <br></br>
            <Form.Label> Sign in to continue :)</Form.Label>
            <Form.Control as="select" size="lg" name="user" onChange={this.onChange.bind(this)}>
            <option value="" >---please sign in---</option>
             {users.map(user =>(
              <option key={user.id} value={user.id} > {user.name}</option>
                 ))}
             </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={disabled}>
            Submit
        </Button>

        
        </Form>

       )
   }

}


function mapStateToProps({ users }){
    return {
        users: Object.values(users)
    }
}
export default connect(mapStateToProps,{setAuthedUser})(SignIn)