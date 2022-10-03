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

import { Device } from '@twilio/voice-sdk';

export default {
  name: "Phone",
  data: function () {
    return {
      device: null,
      activeCall: null,
    };
  },
  methods: {
    async placeOutgoingCall() {
      // invoke device.connect to make an outgoing call
      // keep track of the Call instance that is returned
      this.activeCall  = await this.device.connect();
      // add a 'disconnect' event listener to the call object
      this.activeCall.addListener('disconnect', () => {
        // set activecall to null, because it will reset the UI
        this.activeCall = null;
      })     
    }, 
    hangup() {
      // invoke .disconnect() on the Call instance
      this.activeCall.disconnect();
    },
  },
  async mounted() {
    //fetch a token
    let response = await fetch(`Your accessToken endpoint here`);
    const data = await response.json();
    const token = data.token;

    // create a new Device instance and save it in the component's data property
    this.device = new Device(token, {logLevel: 1});

    // add an 'error' event listener to the Device instance
    this.device.addListener('error', (twilioError) => {
      console.error(`Twilio Device error: ${twilioError.message}`)
    });
  }
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
