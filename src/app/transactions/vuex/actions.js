import {
    SET_TRANSACTIONS,
    CREATE_TRANSACTION,
    UPDATE_TRANSACTION,
    // UPDATE_TRANSACTION_AMOUNT,
    DELETE_TRANSACTION,
} from './mutation-types';

import {default as mockup} from '@/../mockup_data';
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {requestConfig} from '../../../main'


/**
 *
 * @param { function } commit
 * @param { object } accounts
 */
export function setTransactions({state, commit}, accountId) {
    if (!state.transactions || Object.keys(state.transactions).length === 0) {
        //Todo fetch accounts

        // let filteredObject = Object.values(state.transactions).reduce((r, e) => {
        //     if (acceptedValues.includes(myObject[e])) r[e] = myObject[e]
        //     return r;
        // }, {})
        console.log(accountId)

    }
    let transactions = mockup.transactions
    commit(SET_TRANSACTIONS, transactions);
}

export async function createTransaction({commit}, {transaction, accountId}) {
    const ID = uuidv4();
    let transactionWithIdentifiers = Object.assign(transaction, {id: ID, accountId: accountId});

    // Request Object
    const requestBody = JSON.stringify({
        // Todo user
        user: 'vito',
        requestData: transactionWithIdentifiers
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/transactions/create_transaction.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(CREATE_TRANSACTION, {transaction: transactionWithIdentifiers});
        })
        .catch(err => {
            console.log(err)
        });

}

export async function updateTransaction({commit}, data) {
    console.log(data)
    // Request Object
    const requestBody = JSON.stringify({
        user: 'vito',
        requestData: data
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/transactions/update_transaction.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(UPDATE_TRANSACTION, {transaction: data});
        })
        .catch(err => {
            console.log(err)
        });
}

// export function updateTransactionBalance({commit}, data) {
//     commit(UPDATE_ACCOUNT_BALANCE, {account:data});
// }

export async function deleteTransaction({commit}, data) {
    console.log(data)
    // Request Object
    const requestBody = JSON.stringify({
        user: 'vito',
        requestData: data
    })
    console.log(requestBody)

    // Send Request
    await axios.post('api/transactions/delete_transaction.php', requestBody, requestConfig)
        .then(res => {
            console.log(res)
            commit(DELETE_TRANSACTION, {transaction: data});
        })
        .catch(err => {
            console.log(err)
        });
}
