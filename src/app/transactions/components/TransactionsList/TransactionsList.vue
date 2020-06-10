<template>
    <div id="transaction-list-view">
        <main class="level">
            <header class="d-flex justify-content-center align-items-center mb-4">
                <h1 class="title is-2">{{ getAccountById(accountId).name }}: {{ getAccountById(accountId).balance }}</h1>
                <b-button ID="createTransactionBtn" pill variant="primary" size="md" :to="{ name: 'CreateTransaction', params: {accountId:accountId} }"
                          class="d-block ml-3">+ Add
                </b-button>
<!--                Todo Create toggle for transaction creation-->
<!--                <b-button ID="createTransactionBtn" pill variant="primary" size="sm" v-b-toggle.my-collapse-->
<!--                          class="d-block">+ Add-->
<!--                </b-button>-->
            </header>
            <main>

                <div class="row">
                    <div class="col-4">

                        <b-list-group style="max-width: 300px;">
                            <b-list-group-item class="d-flex align-items-center"
                                               :to="{ name: 'TransactionsList', params: { accountId:accountId} }">
                                <b-avatar icon="inbox" aria-hidden="true" scale="1" class="rounded-circle" variant="success"></b-avatar>
                                <span class="mr-auto">Account</span>
                                <b-badge variant="success" pill>{{ getTransactionsListByAccount(accountId).length }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex align-items-center" v-bind:key="category.id" v-for="category in getCategories"
                                               :to="{ name: 'TransactionsListByCategory', params: { accountId:accountId,categoryId: category.id } }">
                                <b-avatar :icon="category.icon" aria-hidden="true" scale="1" class="rounded-circle " variant="light"></b-avatar>
                                <span class="mr-auto">{{ category.title }}</span>
                                <b-badge variant="" pill>{{ getNumberOfTransactionsInsideCategory(accountId, category.id) }}</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                    <div class="col-8">
                        <table class="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Transaction</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:key="transaction.id" v-for="(transaction) in transactionList">
                                <td><b-icon icon="circle-fill" :variant="transaction.amount >= 0 ? 'success' : 'danger'"></b-icon></td>
                                <td>
                                    <span class="subtitle is-5">{{ transaction.title }}</span>
                                </td>
                                <td><span class="subtitle is-5">{{ transaction.amount }} ,- CZK</span></td>
                                <td>
                                    <b-button size="sm" :to="{ name: 'UpdateTransaction', params: { accountId:accountId, transactionId: transaction.id } }" >
                                        <b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>
                                    <b-button size="sm" variant="danger" @click="deleteTransaction(transaction)" class="ml-2">
                                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <b-collapse id="my-collapse">

                </b-collapse>

            </main>

        </main>
    </div>
</template>


<script>
    // @ is an alias to /src
    import {mapState, mapActions, mapGetters} from 'vuex';
    import {CATEGORIES} from '../../CATEGORIES'

    export default {
        name: 'TransactionsList',
        props: ['accountId','categoryId'],
        data() {
            return {
                categories: CATEGORIES,
            }
        },
        methods: {
            ...mapActions([
                'setTransactions',
                'deleteTransaction',
                'setAccounts','setCategories'
            ]),
        },
        mounted() {
            this.setAccounts();
            this.setCategories();
            this.setTransactions(this.accountId);
        },
        computed: {
            ...mapState({
                'transactions': state => state.transactions.transactions
            }),
            ...mapGetters(['getTransactionsListByAccount', 'getAccountById',
            'getNumberOfTransactionsInsideCategory',
                'getTransactionsListByAccountFilterByCategory','getCategories']),
            transactionList: function () {
                return this.categoryId ? this.getTransactionsListByAccountFilterByCategory(this.accountId, this.categoryId)
                    : this.getTransactionsListByAccount(this.accountId)

            }
        }
    }
</script>