<template>
  <div id="app">
    <Desktop />
    <MenuBar />
  </div>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";
import Desktop from "./components/Desktop.vue";

export default {
  name: "App",
  components: {
    MenuBar,
    Desktop,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  min-width: 1vw;
}

#app {
  background-color: #008282;
  margin: 0;
  padding: 0;
  height: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
