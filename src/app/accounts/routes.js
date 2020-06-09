import * as components from './components';
import Home from './../../views/Home'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/accounts/list',
        name: 'AccountsList',
        component: components.AccountsList,
    },
    {
        path: '/accounts/create',
        name: 'CreateAccount',
        component: components.CreateUpdateAccount,
    },
    {
        path: '/accounts/:accountId/update',
        name: 'UpdateAccount',
        component: components.CreateUpdateAccount,
        props: true
    }
]

const protected_routes = ['AccountsList', 'CreateAccount', 'UpdateAccount']

export {routes, protected_routes};