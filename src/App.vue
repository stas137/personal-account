<template>
  <div id="app">
    
    <img alt="Vue logo" src="./assets/logo.png">

    <!--keep-alive></keep-alive-->
      <router-view></router-view>
    
    <!--vLogin msg="Личный кабинет"/-->

  </div>
</template>

<script>

//import vLogin from './components/v-login'

export default {
  name: 'App',
  components: {
    //vLogin
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
  margin-top: 40px;
}

img {
  width: 55px;
  margin-bottom: 20px;
}
</style>
