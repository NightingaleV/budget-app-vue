import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from './mutation-types';
// import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



/**
 *
 * @param { function } commit
 * @param { object } accounts
 */


export function registerUser({commit}, userobject) {
    const ID = uuidv4();
    let user = Object.assign({ id: ID }, userobject);
    delete user.password2
    commit(REGISTER_USER, user);
}

export function loginUser({commit}, user) {
    commit(LOGIN_USER, user);
}

export function logoutUser({commit}, user) {
    commit(LOGOUT_USER, {user:user});
}