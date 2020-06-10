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
                                v-model="userObject.email"
                                type="email"
                                required
                                placeholder="johndoe@gmail.com"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                type="password"
                                v-model="userObject.password"
                                required
                                placeholder="********"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="Password again:" label-for="input-2">
                        <b-form-input
                                id="input-3"
                                type="password"
                                v-model="userObject.password2"
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
<!--                <pre class="m-0">{{ userObject }}</pre>-->
<!--            </b-card>-->
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'user-login-view',
        props: [],
        data() {
            return {
                userObject: {
                    email: '',
                    password: '',
                    password2: ''
                },
                show: true,
                showAlert: false,
                alertMsg: ''
            }
        },
        mounted() {
        },
        methods: {
            ...mapActions([
                'registerUser',
            ]),
            resetAndGo() {
                this.userObject = {};
                this.$router.push({name: 'AccountsList'});
            },
            onSubmit(evt) {
                evt.preventDefault()
                if (this.userObject.password !== this.userObject.password2) {
                    this.alertMsg = 'You passwords are not the same, try again'
                    this.showAlert = true
                } else {
                    this.register()
                }
            },
            async register() {
                console.log(this.userObject)
                await this.registerUser(this.userObject).then((res) => {
                    if(res.response === 'duplicated'){
                        console.log(res);
                        this.showAlert = true
                        this.alertMsg = 'User with this email already exists. '
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

        }
    }
</script>