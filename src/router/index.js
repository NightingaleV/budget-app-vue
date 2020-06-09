import Vue from 'vue'
import VueRouter from 'vue-router'
import { default as store} from '@/store';
import { routes, protected_routes } from '../app';

Vue.use(VueRouter)

// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/profile',
//         name: 'Profile',
//         component: Profile
//     },
//     {
//         path: '/account',
//         name: 'AccountList',
//         component: AccountsList
//     }
//     // {
//     //   path: '/profile',
//     //   name: 'Profile',
//     //   // route level code-splitting
//     //   // this generates a separate chunk (about.[hash].js) for this route
//     //   // which is lazy-loaded when the route is visited.
//     //   component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
//     // }
// ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(protected_routes.includes(to.name)){
    store.getters["isUserAuthenticated"] ? next() : next({name:'LoginPage'})
  } else {
    next()
  }
})



export default router
