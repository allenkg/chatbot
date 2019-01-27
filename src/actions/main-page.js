import { get, post, patch } from "../api"
export const FETCH_DATA = 'MAIN_PAGE/FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'MAIN_PAGE/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'MAIN_PAGE/FETCH_DATA_FAILURE';

export const SEND_MESSAGE = 'MAIN_PAGE/SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'MAIN_PAGE/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'MAIN_PAGE/SEND_MESSAGE_FAILURE';

export const SEND_ANSWER = 'MAIN_PAGE/SEND_ANSWER';
export const SEND_ANSWER_SUCCESS = 'MAIN_PAGE/SEND_ANSWER_SUCCESS';
export const SEND_ANSWER_FAILURE = 'MAIN_PAGE/SEND_ANSWER_FAILURE';

const url = 'http://localhost:3001/messages';

function fetchData() {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA });
    return get(url)
      .then((data) => {
        dispatch({ type: FETCH_DATA_SUCCESS, data });
      })
      .catch((errors) => dispatch({ type: FETCH_DATA_FAILURE, errors }))
  }
}

function sendMessage(message) {
  return (dispatch) => {
    dispatch({ type: SEND_MESSAGE });
    const payload = {
      question: message
    };
    return post(url, payload )
      .then((data) => {
        dispatch({ type: SEND_MESSAGE_SUCCESS, data });
        dispatch(fetchData());
        let timeout = setTimeout(() => {
          dispatch(sendAnswer(data));
          clearTimeout(timeout);
        }, 1000)
      })
      .catch((errors) => dispatch({ type: SEND_MESSAGE_FAILURE, errors }))
  }
}

function sendAnswer(message) {
  return (dispatch) => {
    dispatch({type: SEND_ANSWER});
    const payload = {
      answer: message.question.split(" ").length
    };
    return patch(`${url}/${message.id}`, payload )
      .then((data) => {
        dispatch({ type: SEND_ANSWER_SUCCESS, data });
        dispatch(fetchData());
      })
    .catch((errors) => dispatch({ type: SEND_ANSWER_FAILURE, errors }))
  }
}

export default {
  fetchData,
  sendMessage
}