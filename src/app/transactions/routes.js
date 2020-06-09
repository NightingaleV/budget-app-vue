import * as components from './components';

const routes = [
    {
        path: '/accounts/:accountId/transactions',
        name: 'TransactionsList',
        component: components.TransactionsList,
        props: true
    },
    {
        path: '/accounts/:accountId/transactions/:categoryId',
        name: 'TransactionsListByCategory',
        component: components.TransactionsList,
        props: true
    },
    {
        path: '/accounts/:accountId/transactions/create',
        name: 'CreateTransaction',
        component: components.CreateUpdateTransaction,
        props: true
    },
    {
        path: '/transaction/update/:transactionId',
        name: 'UpdateTransaction',
        component: components.CreateUpdateTransaction,
        props: true
    }
]
const protected_routes = ['TransactionsList', 'TransactionsListByCategory', 'CreateTransaction','UpdateTransaction']

export {routes, protected_routes};