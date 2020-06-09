import {routes as accounts} from './accounts'
import {routes as transactions} from './transactions'
import {routes as users} from './users'
// import {protected_routes as accounts_protected} from './accounts'
// import {protected_routes as transactions_protected} from './transactions'
// import {protected_routes as users_protected} from './users'
// export const protected_routes = [...accounts_protected, transactions_protected, users_protected]
export const protected_routes = []

export default [...accounts, ...transactions,...users]
