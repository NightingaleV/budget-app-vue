export default {
    getTransactionsListByAccount: (state) => (accountId) => {
        return state.transactions ? Object.values(state.transactions).filter((transaction) => { return transaction.accountId === accountId}) : [];
    },
    getTransactionsListByAccountFilterByCategory: (state) => (accountId,categoryId) => {
        return state.transactions ?
            Object.values(state.transactions).filter((transaction) => {
                return transaction.accountId === accountId && transaction.categories.includes(categoryId)
            }) : [];
    },

    getTransactionById: (state) => (transactionId) => {
        return state.transactions && transactionId in state.transactions ? state.transactions[transactionId] : false;
    },

    getNumberOfTransactionsInsideCategory: (state) => (accountId, categoryId) => {
        // console.log('Account', accountId);
        // console.log('Category', categoryId)
        //
        // console.log(Object.values(state.transactions))
        return state.transactions ? Object.values(state.transactions).filter((transaction) => { return (transaction.accountId === accountId) && (transaction.categories.includes(categoryId))}).length : [];
    },
};