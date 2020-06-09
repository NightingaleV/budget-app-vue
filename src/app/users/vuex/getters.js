/**
 *
 *
 * @param { VuexState } state
 * @return { object }
 */

export default {
    isUserAuthenticated: (state)=> {
        return state.user.isAuthenticated;
    },
    getUserEmail: (state) => {
        return state.user.email || null
    }
};