import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from './mutation-types';
// import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {requestConfig} from "../../../main";



/**
 *
 * @param { function } commit
 * @param { object } accounts
 */


export async function registerUser({commit}, userobject) {
    const ID = uuidv4();
    let user = Object.assign({ id: ID }, userobject);
    delete user.password2

    // Request Object
    const requestBody = JSON.stringify({
        requestData: user
    })

    // Send request
    const response = await axios.post('api/users/create_user.php', requestBody, requestConfig)
    if (response.data && response.data.response !== 'duplicated'){
        commit(REGISTER_USER, user);
        return {response:'success'}
    } else {
        return response.data
    }

}

export async function loginUser({commit}, user) {


    // Request Object
    const requestBody = JSON.stringify({
        requestData: user
    })
    console.log(requestBody)
    // Send request
    const response = await axios.post('api/users/login_user.php', requestBody, requestConfig)
    if (response.data && response.data.response === 'success'){
        commit(LOGIN_USER, user);
    }
    return response.data
}

export function logoutUser({commit}, user) {
    commit(LOGOUT_USER, {user:user});
}