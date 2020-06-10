<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="success">
            <b-navbar-brand tag="h1" class="mb-0">VueBudgetApp</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <div v-if="isUserAuthenticated">
                        <b-nav-item :to="{ name: 'AccountsList' }">Accounts</b-nav-item>
                    </div>
                    <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto" v-if="isUserAuthenticated">
                    <b-nav-item :to="{ name: 'LoginPage' }" >{{getUserEmail}}</b-nav-item>
                    <b-nav-item @click="logoutUserFromApp">Logout</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto" v-else>
                    <b-nav-item :to="{ name: 'LoginPage' }">Login</b-nav-item>
                    <b-nav-item :to="{ name: 'RegisterPage' }">Register</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: {
        },
        methods: {
            ...mapActions({
                logoutUser: 'logoutUser',
            }),
            logoutUserFromApp (){
                this.logoutUser()
                this.$router.push({ name: 'Home' });
            }
        },
        computed: {
            ...mapGetters(['isUserAuthenticated', 'getUserEmail']),
        }
    };
</script>
