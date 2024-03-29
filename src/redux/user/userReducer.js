import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT, SET_TOAST_MSG } from "./userTypes"
import produce from 'immer'

const initialState = {
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    isUserValid: JSON.parse(localStorage.getItem('isUserValid')) || false,
    user: localStorage.getItem('user') || null,
    toastMsg: '',
    toastMsgType: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOAST_MSG: {
            return {
                ...state,
                toastMsg: action.toastMsg,
                toastMsgType: action.toastMsgType
            }
        }
        case FETCH_USER_SUCCESS: {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userId', action.payload.user._id)
            localStorage.setItem('isUserValid', true)
            const newState = produce(state, (draftState) => {
                draftState.token = action.payload.token
                draftState.userId = action.payload.user._id
                draftState.isUserValid = true
            })
            return newState
        }
        case FETCH_USER_FAILURE: {
            localStorage.setItem('error', action.payload)
            localStorage.setItem('isUserValid', false)
            return {
                ...state,
                error: action.payload,
                isUserValid: false
            }
        }
        case TOKEN_IS_VALID: {
            localStorage.setItem('isUserValid', true)
            localStorage.setItem('user', action.payload)
            return {
                ...state,
                isUserValid: true,
                user: action.payload
            }
        }
        case TOKEN_IS_NOT_VALID: {
            localStorage.setItem('isUserValid', false)
            localStorage.setItem('token', '')
            return {
                ...state,
                isUserValid: false,
                token: ''
            }
        }
        case USER_SIGNED_OUT: {
            localStorage.setItem('token', '')
            localStorage.setItem('isUserValid', false)
            localStorage.setItem('user', null)
            return {
                token: '',
                toastMsg: action.toastMsg,
                toastMsgType: action.toastMsgType,
                isUserValid: false,
                user: null
            }
        }

        default: return state
    }
}

export default userReducer