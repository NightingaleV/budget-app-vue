<template>
    <div class="row">
        <div class="col-8 offset-2">
            <b-card title="Add Transaction">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                            id="input-group-1"
                            label="Transaction Title:"
                            label-for="input-1"
                            description=""
                            class="d-block"
                    >
                        <b-form-input
                                id="input-1"
                                v-model="transactionObject.title"
                                type="text"
                                required
                                placeholder="Enter title"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-select v-model="selectedCategory" :options="options" multiple :select-size="4"></b-form-select>
<!--                    <div class="mt-3">Selected: <strong>{{ selectedCategory }}</strong></div>-->
                    <b-form-group id="input-group-2" label="Transaction Amount:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                type="number"
                                step="0.01"
                                v-model="transactionObject.amount"
                                required
                                placeholder="Enter amount"
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger" v-if="!editing">Reset</b-button>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {CATEGORIES} from '../../CATEGORIES'

    export default {
        name: 'transactions-create-update-view',
        props: ['accountId', 'transactionId'],
        data() {
            return {
                transactionObject: {},
                show: true,
                editing: false,
                categories: CATEGORIES,
                selectedCategory: [], // Array reference
                options: []
            }
        },
        // Update Account
        mounted() {
            this.setTransactions(this.accountId);
            this.loadCategoriesIntoForm()
            if (this.transactionId) {
                // if props exist then its considered update
                this.loadTransaction()
            }
        },
        methods: {
            ...mapActions([
                'setTransactions',
                'updateTransaction',
                'createTransaction',
                'updateAccountBalance'
            ]),
            loadCategoriesIntoForm(){
                Object.values(this.getCategories).forEach(category =>{
                    let categoryOption = {value: category.id, text:category.title}
                    this.options.push(categoryOption)
                })
            },
            resetAndGo() {
                this.transactionObject = {};
                this.$router.push({name:'TransactionsList', params: {accountId: this.accountId}});
            },
            onSubmit(evt) {
                evt.preventDefault()
                // alert(JSON.stringify(this.form))
                this.editing ? this.saveTransaction() : this.saveNewTransaction()
            },
            saveTransaction() {
                // this.transactionObject.categories = this.selectedCategory
                // this.updateTransaction(this.transactionObject).then(() => {
                //     this.resetAndGo();
                // });

                const originTransaction = this.getTransactionById(this.transactionObject.id);

                let transactionToUpdate = Object.assign({}, this.transactionObject);
                transactionToUpdate.categories = this.selectedCategory;
                this.updateTransaction(transactionToUpdate).then(() => {
                            this.resetAndGo();
                        });

                // this.transactionObject.categories = this.selectedCategory
                // const transactionObject = Object.assign({}, this.transactionObject)
                // transactionObject.categories = this.selectedCategory
                // this.updateTransaction(transactionObject).then(() => {
                //     this.resetAndGo();
                // });

                // Update Balance

                const newTransactionAmount =  transactionToUpdate.amount - originTransaction.amount
                // console.log(newTransactionAmount)
                this.updateAccountBalance({accountId:this.accountId, amount:newTransactionAmount})
            },
            saveNewTransaction() {

                // New Transaction
                const transactionFullObject= Object.assign(this.transactionObject, {categories: this.selectedCategory})
                const dataToSend = {
                    transaction: transactionFullObject,
                    accountId: this.accountId
                }
                console.log(JSON.stringify((dataToSend)))
                this.createTransaction(dataToSend).then(() => {
                    this.resetAndGo();
                });
                // Update Balance
                this.updateAccountBalance({accountId:this.accountId, amount:transactionFullObject.amount})
            },
            onReset(evt) {
                evt.preventDefault()
                this.transactionObject.title = ''
                this.transactionObject.amount = ''
                this.selectedCategory = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            // Updating
            loadTransaction() {
                let instance = this
                this.setTransactions(this.accountId).then(() => {
                    let transactionToUpdate = instance.getTransactionById(instance.transactionId);
                    if (transactionToUpdate) {
                        instance.transactionObject = Object.assign(instance.transactionObject,transactionToUpdate)
                        instance.show = false
                        instance.$nextTick(() => {
                            instance.show = true;
                            instance.editing = true;
                        })
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'getTransactionById','getCategories'
            ])
        },
        watch: {
            // accountId (newId) {
            //     if (newId) {
            //         this.loadTransaction();
            //     } else {
            //         this.editing = false;
            //         this.accountObject = {};
                // }
            //
            // },
            accountId() {
                // this.updatePage(this.$route.params.accountId)
                this.loadTransaction()
            }
        }
    }
</script>