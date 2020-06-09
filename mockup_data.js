const today = new Date();

const transactions = {
    'af3e0eb8-dbec-4e77-b21a-e778bcb9c037': {
        id:'af3e0eb8-dbec-4e77-b21a-e778bcb9c037',
        title: 'kapesny za leden',
        accountId: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        categories: ['1','3', '5', '7'] ,
        isRevenue: 1,
        amount: 500,
        createdAt: today
    },
    'ad01e2cd-6462-40cd-8703-b1d5739a3e68': {
        id:'ad01e2cd-6462-40cd-8703-b1d5739a3e68',
        title: 'kapesny za unor',
        accountId: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        categories: ['1','3', '5', '7'] ,
        isRevenue: 1,
        amount: 500,
        createdAt: today
    },
    '34ad576d-ce83-422c-aa78-931f284fa04a': {
        id:'34ad576d-ce83-422c-aa78-931f284fa04a',
        title: 'kapesny za brezen',
        accountId: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        categories: ['1','3', '5', '7'] ,
        isRevenue: 1,
        amount: 500,
        createdAt: today
    },
    '12': {
        id:'12',
        title: 'aliments',
        accountId: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        categories: ['2','4', '6', '8'],
        isRevenue: 0,
        amount: -1500,
        createdAt: today
    },
    '2': {
        id:'2',
        title: 'groceries',
        accountId: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        categories: ['2','4', '6', '8'],
        isRevenue: 0,
        amount: -250,
        createdAt: today
    },
    '21': {
        id:'21',
        title: 'groceries',
        accountId: '2',
        categories: [],
        isRevenue: 1,
        amount: 750,
        createdAt: today
    }
}

const user = {
    email: 'vita',
    password:'slav'
}

// const transactions = {
//     '1': {
//         id:'1',
//         title: 'monthly salary',
//         accountId: '1',
//         categories: ['Income', 'Investments'] ,
//         isRevenue: 1,
//         amount: 3000,
//         createdAt: today
//     },
//     '12': {
//         id:'12',
//         title: 'aliments',
//         accountId: '1',
//         categories: ['Housing', 'Technology', 'Investments'],
//         isRevenue: 0,
//         amount: -1500,
//         createdAt: today
//     },
//     '2': {
//         id:'2',
//         title: 'groceries',
//         accountId: '2',
//         categories: ['Food & Drinks','Shopping','Technology'],
//         isRevenue: 0,
//         amount: -250,
//         createdAt: today
//     },
//     '21': {
//         id:'21',
//         title: 'groceries',
//         accountId: '2',
//         categories: ['Food & Drinks','Shopping'],
//         isRevenue: 1,
//         amount: 750,
//         createdAt: today
//     }
// }

const accounts = {
    'ab53cc06-c205-45f5-a4d7-9680aaa5ba80': {
        id: 'ab53cc06-c205-45f5-a4d7-9680aaa5ba80',
        ownerId: 1,
        name: "Pocket Money",
        balance: 0
    },
    '2': {
        id: '2',
        ownerId: 1,
        name: "Cash in my pocket",
        balance: 500
    }
}

// const user = {
//     id: 1,
//     email: "vitezslavik@gmail.com",
//     full_name: "Vitezslav Slavik"
// }

const categories = [
    {
        id: 1,
        title: "Salary"
    },
    {
        id: 2,
        title: "Groceries"
    }
]

export default {transactions, accounts, user, categories,}