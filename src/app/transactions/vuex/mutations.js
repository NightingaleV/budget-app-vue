import Vue from 'vue';
import {
    SET_TRANSACTIONS,
    CREATE_TRANSACTION,
    UPDATE_TRANSACTION,
    // UPDATE_TRANSACTION_AMOUNT,
    DELETE_TRANSACTION,
} from './mutation-types';

export default {
    /**
     *
     * @param { VuexState } state
     * @param { object } payload
     */
    [SET_TRANSACTIONS](state, payload) {
        state.transactions = payload;
        // Vue.set(state, 'accounts', payload)
        // Vue.set(state.accounts, payload. , payload)
        // Object.values(state.accounts).forEach((o) => { o.balance = parseFloat(o.balance); });
    },
    [CREATE_TRANSACTION](state, {transaction}) {
        const {amount} = transaction;
        transaction.amount = parseFloat(amount);
        Vue.set(state.transactions,transaction.id, transaction)
    },
    [UPDATE_TRANSACTION](state, {transaction}) {
        const {amount} = transaction;
        transaction.amount = parseFloat(amount);
        Vue.set(state.transactions,transaction.id, transaction)
    },
    // [UPDATE_TRANSACTION_AMOUNT](state, {transaction, amount}) {
    //     let changingAccount = state.transactions[transaction.id]
    //     changingAccount.balance += amount;
    //     Vue.set(state.accounts, account.id, changingAccount)
    //     Vue.set(state.transactions,transaction.id, transaction)
    // },
    [DELETE_TRANSACTION](state, {transaction}) {
        Vue.delete(state.transactions, transaction.id)
        // todo fix account balance
    },
};