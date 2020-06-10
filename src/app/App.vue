<template>
    <div id="app">
        <Navigation></Navigation>
        <div class="container mt-5">
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
