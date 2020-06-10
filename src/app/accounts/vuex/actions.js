import {
    CREATE_ACCOUNT,
    DELETE_ACCOUNT,
    SET_ACCOUNTS,
    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_BALANCE
} from './mutation-types';

// import {default as mockup} from '@/../mockup_data';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {requestConfig} from '../../../main'

/**
 *
 * @param { function } commit
 * @param { object } accounts
 */



export async function setAccounts({state, commit}, user) {

    if (!state.accounts || Object.keys(state.accounts).length === 0) {
        // Request Object
        const requestBody = JSON.stringify({
            user: user.email
        })
        console.log(requestBody)

        await axios.post('api/accounts/read_accounts.php', requestBody, requestConfig)
            .then(res => {
                let {payload} = res.data
                commit(SET_ACCOUNTS, payload);
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export async function createAccount({commit}, {user, data}) {
    const ID = uuidv4();
    let account = Object.assign({id: ID}, data);

    // Request Object
    const requestBody = JSON.stringify({
        user: user.email,
        requestData: account
    })

    // Send Request
    await axios.post('api/accounts/create_account.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(CREATE_ACCOUNT, {account: account});
        })
        .catch(err => {
            console.log(err)
        });


}

export async function updateAccount({commit}, {user, data}) {

    console.log(data)
    // Request Object
    const requestBody = JSON.stringify({
        user: user.email,
        requestData: data
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/accounts/update_account.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(UPDATE_ACCOUNT, {account: data});
        })
        .catch(err => {
            console.log(err)
        });


}

export async function updateAccountBalance({state, commit}, {accountId, amount}) {
    // Calculate new balance
    let changingAccount = state.accounts[accountId]
    let accountBalance = parseFloat(changingAccount.balance);
    accountBalance += parseFloat(amount);


    // Request Object
    const requestBody = JSON.stringify({
        requestData: {
            id: accountId,
            balance: accountBalance
        }
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/accounts/update_account_balance.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(UPDATE_ACCOUNT_BALANCE, {accountId, balance:accountBalance});
        })
        .catch(err => {
            console.log(err)
        });
}

export async function deleteAccount({commit}, data) {

    console.log(data)
    // Request Object
    const requestBody = JSON.stringify({
        requestData: data
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/accounts/delete_account.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(DELETE_ACCOUNT, {account: data});
        })
        .catch(err => {
            console.log(err)
        });
}
