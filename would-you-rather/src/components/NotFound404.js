import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router , Route  } from 'react-router-dom'

export class NotFound404 extends Component{

    render()
    {
        return(
            <div> Ooops page not found !</div>
        )
    }

}
export default connect()(NotFound404)