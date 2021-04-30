<template>
  <div id="app">
    <p> Made by Giorgio Allena </p>
    <div id="nav">
      <router-link to="/">HomePage</router-link> |
      <router-link to="/logIn">LogIn</router-link> | 
      <router-link to="/archive">Archive</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
p {
    margin: 0;
    color: blue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px 0 10px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #0000ff;
}
</style>