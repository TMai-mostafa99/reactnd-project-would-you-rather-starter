import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion } from '../utils/_DATA';
import {addQuestionToUser} from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addAnswerToQuestion(authedUser, qid, answer) {
    return {
      type: ADD_ANSWER_TO_QUESTION,
      authedUser,
      qid,
      answer
    };
  }
  
export function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
  }
/////////////////////// SEE THIS AGAIN ///////////////
export function handleSaveQuestion(optionOneText , optionTwoText , author){
  console.log("AUTHORRRR " , author)
    return dispatch => {
        return _saveQuestion({ optionOneText , optionTwoText , author }).then(
            question => {
                dispatch(addQuestion(question));
                dispatch(addQuestionToUser(question));
            }
        )
    }
}
