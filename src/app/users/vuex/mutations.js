import Vue from 'vue';
import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from './mutation-types';
// import {default as mockup} from '@/../mockup_data'

export default {
    /**
     *
     * @param { VuexState } state
     * @param { object } payload
     */
    [REGISTER_USER](state, {email}) {
        Vue.set(state.user, 'email', email)
        Vue.set(state.user, 'isAuthenticated', true)
    },
    [LOGIN_USER](state, {email}) {
        Vue.set(state.user, 'email', email)
        Vue.set(state.user, 'isAuthenticated', true)
    },
    [LOGOUT_USER](state) {
        Vue.set(state.user, 'email', '')
        Vue.set(state.user, 'isAuthenticated', false)
    },
};
