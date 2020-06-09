/**
 *
 *
 * @param { VuexState } state
 * @return { object }
 */
// export function getAccountById(state) {
//     (accountId) => {return state.accounts && accountId in state.accounts ? state.accounts[accountId] : false;}
//
// }
//
// export function getAccountList (state) {
//     return state.accounts && Object.keys(state.accounts).length > 0 ? Object.values(state.accounts) : [];
// }
export default {
    getAccountById: (state) => (accountId) => {
        return state.accounts && accountId in state.accounts ? state.accounts[accountId] : false;
    },

    getAccountsList: (state) => {
        return state.accounts && Object.keys(state.accounts).length > 0 ? Object.values(state.accounts) : [];
    }
};