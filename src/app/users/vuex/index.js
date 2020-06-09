import * as actions from './actions';
import mutations from './mutations';
import {default as getters} from './getters';
import state from './state';

export default {
    namespaced: false,
    mutations,
    actions,
    state,
    getters,
};
