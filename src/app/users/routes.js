import * as components from './components';

const routes = [

    {
        path: '/user/register',
        name: 'RegisterPage',
        component: components.RegisterPage
    },
    {
        path: '/user/login',
        name: 'LoginPage',
        component: components.LoginPage
    }
    // {
    //     path: '/user/login',
    //     name: 'UpdateAccount',
    //     component: components.CreateUpdateAccount,
    //     props: true
    // }
]

const protected_routes = []

export {routes, protected_routes};