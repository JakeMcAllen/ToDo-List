<template>
  <div id="app">
    <img src="@/assets/background_img.jpg" alt="img of background of jellyfish">
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
img {
  display: flex;
  position: absolute;
  z-index: -1;
  opacity: 0.4;
  margin-left: 5%;
  margin-top: 2%;
}
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