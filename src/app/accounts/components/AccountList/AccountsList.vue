<template>
    <div id="accounts-list-view">

        <main class="level">
            <header class="d-flex justify-content-center align-items-center">
                <h1 class="title is-2">List of Accounts</h1>
                <b-button ID="createAccountBtn" pill variant="success" size="sm" :to="{ name: 'CreateAccount' }"
                          class="d-block">+ Create
                </b-button>
            </header>
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Account name</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-bind:key="account.id" v-for="(account) in getAccountsList">
                    <td>
                        <b-icon :icon="account.balance >= 0 ? 'arrow-up-right' : 'arrow-down-right'" :variant="account.balance >= 0 ? 'success' : 'danger'"></b-icon>
                    </td>
                    <td>
                        <b-link :to="{name:'TransactionsList', params: {accountId: account.id}}"><span
                                class="subtitle is-5">{{ account.name }}</span></b-link>

                    </td>
                    <td><span class="subtitle is-5">{{ account.balance }} ,- CZK</span></td>
                    <td>
                        <b-button size="sm" :to="{ name: 'UpdateAccount', params: { accountId: account.id } }">
                            <b-icon icon="pencil" aria-hidden="true"></b-icon>
                        </b-button>
                        <b-button size="sm" variant="danger" @click="deleteAccount(account)" class="ml-2">
                            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </b-button>
                        <!--                        <a class="button is-danger" @click="confirmDeleteAccount(account)">Delete</a>-->
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>


<script>
    // @ is an alias to /src
    import {mapState, mapActions, mapGetters} from 'vuex';

    export default {
        name: 'AccountsList',
        methods: {
            ...mapActions([
                'setAccounts',
                'deleteAccount'
            ]),
        },
        mounted() {
            // this.$store.dispatch('setAccounts');
            // this.$store.dispatch('accounts/setAccounts');
            this.setAccounts();
        },
        computed: {
            ...mapState({
                'accounts': state => state.accounts.accounts
            }),
            ...mapGetters(['getAccountsList'])
        }
    }
</script>


<style scoped>
    #createAccountBtn {
        margin-left: 15px;
    }
</style>