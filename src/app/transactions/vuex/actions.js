import {
    SET_TRANSACTIONS,
    CREATE_TRANSACTION,
    UPDATE_TRANSACTION,
    // UPDATE_TRANSACTION_AMOUNT,
    DELETE_TRANSACTION, SET_CATEGORIES,
} from './mutation-types';

// import {default as mockup} from '@/../mockup_data';
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {requestConfig} from '../../../main'


/**
 *
 * @param { function } commit
 * @param { object } accounts
 */
export async function setTransactions({commit}, accountId) {

    // Request Object
    const requestBody = JSON.stringify({
        requestData: {accountId}
    })

    await axios.post('api/transactions/read_transactions.php', requestBody, requestConfig)
        .then(res => {
            // console.log(res)
            const { payload } = res.data
            console.log(payload)
            commit(SET_TRANSACTIONS, payload);
        })
        .catch(err => {
            console.log(err)
        });

}

export async function setCategories({state, commit}) {

    if(state.categories){
        // Request Object
        const requestBody = JSON.stringify({
            requestData: {}
        })

        await axios.post('api/categories/read_categories.php', requestBody, requestConfig)
            .then(res => {
                // console.log(res)
                const { payload } = res.data
                // const categories = JSON.parse(payload)
                console.log(payload)
                commit(SET_CATEGORIES, payload);
            })
            .catch(err => {
                console.log(err)
            });
    }

}

export async function createTransaction({commit}, {transaction, accountId}) {
    const ID = uuidv4();
    let transactionWithIdentifiers = Object.assign(transaction, {id: ID, accountId: accountId});

    // Request Object
    const requestBody = JSON.stringify({
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

export async function deleteTransaction({commit}, data) {
    console.log(data)
    // Request Object
    const requestBody = JSON.stringify({
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
