<template>
  <div class="phone">
    
    <!-- show this when there's a call in progress -->
    <p v-if="activeCall">Call in progress.</p>

    <div class="outgoing-call-controls">
      <!-- disable this when there's a call in progress -->
      <button v-if="!activeCall" @click="placeOutgoingCall">Call Me! :-D</button>
      <!-- enable this when there's a call in progress -->
      <button v-if="activeCall" @click="hangup">Hang Up :-(</button>
    </div>

  </div>
</template>

<script>
// import the Device class from the SDK

export default {
  name: "Phone",
  data: function () {
    return {
      device: null,
      activeCall: null
    };
  },
  methods: {
    async placeOutgoingCall() {
      // invoke device.connect to make an outgoing call
      // keep track of the Call instance that is returned

      // add a 'disconnect' event listener to the call object
         // set activecall to null in order to reset the UI
    }, 
    hangup() {
      // invoke .disconnect() on the Call instance
    },
  },
  async mounted() {
    
      let response = await fetch(`Your accessToken endpoint here`);
      const data = await response.json();
      const token = data.token;
      console.log('token :>> ', token);
  },
};
</script>

<style scoped>
.phone {
  padding: 10px;
  margin-top: 2px;
  width: 100%;
  height: 160px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid rgb(138, 138, 138);
  border-left: 1px solid rgb(138, 138, 138);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
}

.outgoing-call-controls button {
  margin: 5px;
  width: 100px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  border: 2px outset rgb(195, 195, 195);
  border-radius: 0;
  cursor: pointer;
}

.outgoing-call-controls button:active {
  border: 2px inset rgb(138, 138, 138);
}
</style>
