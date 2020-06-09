import Vue from 'vue';
import {
    CREATE_ACCOUNT,
    DELETE_ACCOUNT,
    SET_ACCOUNTS,
    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_BALANCE
} from './mutation-types';
// import {default as mockup} from '@/../mockup_data'

export default {
    /**
     *
     * @param { VuexState } state
     * @param { object } payload
     */
    [SET_ACCOUNTS](state, payload) {
        state.accounts = payload;
        // Vue.set(state, 'accounts', payload)
        // Vue.set(state.accounts, payload. , payload)
        Object.values(state.accounts).forEach((o) => { o.balance = parseFloat(o.balance); });
    },
    [CREATE_ACCOUNT](state, {account}) {
        const {balance} = account;
        account.balance = parseFloat(balance);
        Vue.set(state.accounts,account.id, account)
    },
    [UPDATE_ACCOUNT](state, {account}) {
        const {balance} = account;
        account.balance = parseFloat(balance);
        Vue.set(state.accounts, account.id, account)
    },
    [UPDATE_ACCOUNT_BALANCE](state, {accountId, amount}) {
        let changingAccount = state.accounts[accountId]
        changingAccount.balance = parseFloat(changingAccount.balance);
        changingAccount.balance += parseFloat(amount);
        Vue.set(state.accounts, accountId, changingAccount)
    },
    [DELETE_ACCOUNT](state, {account}) {
        Vue.delete(state.accounts, account.id)
    },
};
