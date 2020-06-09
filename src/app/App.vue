<template>
    <div id="app">
        <Navigation></Navigation>
        <h1>Hello</h1>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/aboutme">About</router-link>
            <b-link :to="{ name: 'AccountsList' }">accountsList</b-link>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    // import HelloWorld from '../components/HelloWorld.vue'
    import {Navigation} from './navigation'

    export default {
        name: 'app',
        components: {
            Navigation,
            // HelloWorld
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
