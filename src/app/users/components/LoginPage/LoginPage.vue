<template>
    <div class="row">
        <div class="col-8 offset-2">
            <b-card title="Create account">
                <b-form @submit="onSubmit" v-if="show">
                    <b-form-group
                            id="input-group-1"
                            label="Email:"
                            label-for="input-1"
                            description=""
                            class="d-block"
                    >
                        <b-form-input
                                id="input-1"
                                v-model="credentialsObject.email"
                                type="text"
                                required
                                placeholder="johndoe@gmail.com"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                type="password"
                                v-model="credentialsObject.password"
                                required
                                placeholder="********"
                        ></b-form-input>
                    </b-form-group>
                    <b-alert v-model="showAlert" variant="danger" dismissible>
                        {{alertMsg}}
                    </b-alert>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </b-card>

<!--            <b-card class="mt-3" header="Form Data Result">-->
<!--                <pre class="m-0">{{ credentialsObject }}</pre>-->
<!--            </b-card>-->
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'user-login-view',
        props: [],
        data() {
            return {
                credentialsObject: {
                    email:'',
                    password:''
                },
                show: true,
                showAlert:false,
                alertMsg:''
            }
        },
        // Update Account
        mounted() {
        },
        methods: {
            ...mapActions([
                'loginUser',
            ]),
            resetAndGo () {
                this.credentialsObject = {};
                this.$router.push({ name: 'AccountsList' });
            },
            onSubmit(evt) {
                evt.preventDefault()
                // alert(JSON.stringify(this.form))
                // this.saveNewAccount()
               this.login()
            },
            login(){
                console.log(this.credentialsObject)
                this.loginUser(this.credentialsObject).then((res)=>{
                    console.log(res)
                    if(res.response === 'wrong_password'){
                        this.showAlert = true
                        this.alertMsg = 'Wrong password. Try again.'
                    } else if (res.response === 'no_user'){
                        this.showAlert = true
                        this.alertMsg = 'No user with that username.'
                    } else {
                        this.resetAndGo();
                    }

                }).catch(err => {
                    console.log(err)
                    this.showAlert = true
                    this.alertMsg = err
                })

            },
        },
        computed: {
            ...mapGetters([])
        },
        watch: {
            // accountId (newId) {
            //     if (newId) {
            //         this.loadAccount();
            //     } else {
            //         // this.editing = false;
            //         // this.accountObject = {};
            //     }
            //
            // }
        }
    }
</script>