<template>
  <div class="menu-bar-border">
    <div class="menu-bar">
      <div>
        <button>Start</button>
      </div>
      <p>Browser Phone '95</p>
      <div class="menu-bar-clock">
        <p>{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data: function () {
    return {
      currentTime: "",
    };
  },
  methods: {
    updateClock() {
      let dt = new Date();
      let hours = ("0" + dt.getHours()).slice(-2);
      let minutes = ("0" + dt.getMinutes()).slice(-2);
      let amPm = hours >= 12 ? "PM" : "AM";
      hours = hours >= 12 ? hours - 12 : hours;
      this.currentTime = `${hours}:${minutes} ${amPm}`;
    },
  },
  mounted() {
    setInterval(this.updateClock, 1000);
  },
};
</script>

<style scoped>
.menu-bar-border {
  border-top: 1.5px solid rgb(202, 202, 202);
  width: 100vw;
  min-height: 41px;
  position: fixed;
  bottom: 0;
  left: 0;
}
.menu-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  border-top: 1px solid rgb(248, 248, 248);
  border-left: none;
  border-bottom: none;
  border-right: none;
  height: 40px;
  background: rgb(195, 195, 195);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99999;
}

.menu-bar button {
  margin: 5px;
  font-family: "Times New Roman", Times, serif;
  border: 2px outset rgb(195, 195, 195);
  border-radius: 0;
  cursor: pointer;
}

.menu-bar button:hover {
  border: 2px solid rgb(138, 138, 138);
}

.menu-bar-clock {
  margin: 5px;
  height: 80%;
  width: 60px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  border-top: 2px solid rgb(138, 138, 138);
  border-left: 2px solid rgb(138, 138, 138);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-bar-clock p {
  font-size: 12px;
}
</style>
