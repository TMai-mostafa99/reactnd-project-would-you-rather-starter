import '../App.css';
import React, { Component , Fragment } from 'react'
import {BrowserRouter as Router , Route, Switch  } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { Redirect } from 'react-router-dom';

import Nav from './Nav'
import Home from './Home'
import Question from './Question'
import NewQuestion from './NewQuestion'
import SignIn from './SignIn';
import Leaderboard  from './LeaderBoard';
import NotFound404 from './NotFound404';


class App extends Component {
  componentDidMount(){
    this.props.handleInitialData();
    //console.log("WE ARE HERE")
  }
  render() {
    console.log("THE APPPP loading IS : ", this.props.loading)
    const {authedUser} = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
           
            { authedUser === null ? 
              <Route render={() => <SignIn/>} />  
            : 
            (
              <Fragment>
              <Nav {...this.props} />   
              <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/signin' component={SignIn} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/question/:id' component={Question} />                
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route component={NotFound404} />
              </Switch>
              </Fragment>
            ) }
          </div>
        </Fragment>
    
      </Router>
     
    )
  }
}


function mapStateToProps ({ authedUser , users }) {
  console.log( "PROPS main" ,authedUser , users)
  return {
    loading: users === null,
    authedUser
  }
}

export default connect(mapStateToProps,{handleInitialData})(App)
