<template>
  <div class="support-window target">
    <div class="support-toolbar">
      <h2>Browser Phone '95 Support</h2>
      <button @click="$emit('support')">X</button>
    </div>
    <Phone />
  <Moveable
        className="moveable"
        v-bind:target="['.target']"
        v-bind:draggable="true"
        @drag="onDrag"
        hideDefaultLines="true"
    />
  </div>
  
</template>

<script>
import Phone from "./Phone.vue";
import Moveable from 'vue-moveable';

export default {
  name: "Support",
  components: {
    Phone,
    Moveable
  },
  methods: {
    onDrag({ target, transform }) {
      target.style.transform = transform;
    },
  }
};
</script>

<style scoped>
.support-window {
  width: 350px;
  min-height: 150px;
  border-left: 1px solid white;
  border-top: 1px solid white;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background: lightgray;
  padding: 1px;
  margin: 60px 60px;
  box-shadow: 2px 2px 2px 0.5px black;
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: absolute;
}

.support-toolbar {
  width: 100%;
  height: 18px;
  padding: 2px;
  background-color: #080082;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.support-toolbar:hover {
  cursor: move;
}

.support-toolbar h2 {
  font-size: 12px;
  margin: 5px;
  font-weight: 300;
  display: inline;
  color: white;
}

.support-toolbar button {
  height: 12px;
  width: 12px;
  padding: 0;
  font-size: 8px;
  border-radius:0;
  border-left: 1px solid white;
  border-top: 1px solid white;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.support-window p {
  margin: 10px;
}

.moveable-control-box {
  display: none !important;
}
</style>
