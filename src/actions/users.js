import { showLoading, hideLoading } from 'react-redux-loading'
import { addAnswerToQuestion } from '../actions/questions';
import { _saveQuestionAnswer } from '../utils/_DATA';


export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'


export function receiveUsers (users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addAnswerToUser(authedUser , qid , answer){
    return{
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }

}

export function addQuestionToUser({id , author}){
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    }
}

export function handleQuestionAnswer(authedUser, qid , answer){
    return dispatch => {
        //console.log('here 1')
        dispatch(addAnswerToUser(authedUser,qid,answer));
        //console.log('here 2')
        dispatch(addAnswerToQuestion(authedUser , qid , answer));
        //console.log('here 3')

        return _saveQuestionAnswer({authedUser , qid , answer})
    }
}
