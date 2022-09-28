<template>
  <button @click="openApp" tabindex="0" class="desktop-icon">
    <img :src="require(`../assets/${appName}-icon.png`)" />
    <p>{{ appName[0].toUpperCase() + appName.substring(1) }}</p>
  </button>
</template>

<script>
export default {
  name: "Icon",
  props: {
    appName: String,
  },
  methods: {
    openApp() {
      this.$emit(this.appName);
    },
  },
};
</script>

<style scoped>
.desktop-icon {
  margin: 5px;
  width: 52px;
  height: 52px;
  padding: 5px;
  background-color: #008282;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.desktop-icon:hover {
  cursor: pointer;
  border: 1px dotted white;
}
.desktop-icon:focus {
  border: 1px dotted white;
}

.desktop-icon p {
  color: white;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 100;
  margin: 0;
}
</style>
