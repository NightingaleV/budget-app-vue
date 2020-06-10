<template>
    <div class="row">
        <div class="col-8 offset-2">
            <b-card title="Create account">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                            id="input-group-1"
                            label="Account Name:"
                            label-for="input-1"
                            description=""
                            class="d-block"
                    >
                        <b-form-input
                                id="input-1"
                                v-model="accountObject.name"
                                type="text"
                                required
                                placeholder="Enter account name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Initial Balance:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                type="number"
                                step="0.01"
                                v-model="accountObject.balance"
                                required
                                placeholder="Enter initial balance"
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
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'accounts-create-update-view',
        props: ['accountId'],
        data() {
            return {
                accountObject: {
                },
                show: true,
                editing: false
            }
        },
        // Update Account
        mounted() {
            this.setAccounts(this.getUserObject)
            if(this.accountId){
                // if props exist then its considered update
                this.loadAccount()
            }
        },
        methods: {
            ...mapActions([
                'createAccount',
                'updateAccount',
                'setAccounts'
            ]),
            resetAndGo () {
                this.accountObject = {};
                this.$router.push({ name: 'AccountsList' });
            },
            onSubmit(evt) {
                evt.preventDefault()
                this.editing ? this.saveAccount() : this.saveNewAccount()
            },
            saveAccount(){
                this.updateAccount({user:this.getUserObject, data: this.accountObject}).then(() => {
                    this.resetAndGo();
                });
            },
            saveNewAccount () {
                this.createAccount({user:this.getUserObject, data: this.accountObject}).then(() => {
                    this.resetAndGo();
                });
            },
            onReset(evt) {
                evt.preventDefault()
                this.accountObject.name = ''
                this.accountObject.balance = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            // Updating
            loadAccount(){
                let instance = this
                this.setAccounts(this.getUserObject).then(()=>{
                    // let accountToUpdate = instance.getAccountById(instance.accountId);
                    let accountToUpdate = instance.getAccountById(instance.accountId);
                    if(accountToUpdate){
                        instance.accountObject = Object.assign(instance.accountObject, accountToUpdate)
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
                'getAccountById','getUserObject'
            ])
        },
        watch: {
            accountId (newId) {
                if (newId) {
                    this.loadAccount();
                } else {
                    // this.editing = false;
                    // this.accountObject = {};
                }

            }
        }
    }
</script>