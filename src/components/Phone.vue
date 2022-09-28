<template>
  <div class="phone">
    
    <!-- tell user when the Device instance has emitted the 'registered' event -->   
      <div class="registered-status">
        <p v-if="!deviceIsRegistered">Not ready ...</p>
        <p v-else>Ready for incoming calls</p>
        <div :style="statusIndicatorStyles"></div>
      </div>
    
    <!-- show this when there's a call in progress -->
    <p v-if="activeCall && !incomingCallIsRinging">Call in progress.</p>

    <div class="outgoing-call-controls">
      <!-- disable this when there's a call in progress -->
      <button v-if="!activeCall" @click="placeOutgoingCall">Call Me! :-D</button>
      <!-- enable this when there's a call in progress -->
      <button v-if="activeCall && activeCall.direction == 'OUTGOING'" @click="hangup">Hang Up :-(</button>
    </div>

    <div class="incoming-call-info">
      
        <!-- show user incoming call controls when the Device instance has emitted the 'incoming' event -->
        <div v-if="activeCall && incomingCallIsRinging" class="incoming-call-controls">
          <p>Incoming call from {{callerNumber}}</p>
          <button @click="acceptIncomingCall">Accept</button>
          <button @click="rejectIncomingCall">Reject</button>
        </div>
        <button @click="hangup" v-if="activeCall && activeCall.direction == 'INCOMING' && !incomingCallIsRinging">Hang Up</button>
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
      callerNumber: '',
      deviceIsRegistered: false,
      incomingCallIsRinging: false
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
    async fetchToken() {
      let response = await fetch(`Your accessToken endpoint here`);
      const data = await response.json();
      return data.token;
    },
    rejectIncomingCall() {
      this.activeCall.reject();
    },
    acceptIncomingCall() {
      this.activeCall.accept();
    },
    handleIncomingCall(call) {

        this.incomingCallIsRinging = true;
        this.activeCall = call;
        this.callerNumber = this.activeCall.parameters.From;

        // add event listeners to the Call instance
        this.activeCall.addListener('accept', () => {
          this.incomingCallIsRinging = false;
        });

        this.activeCall.addListener('reject', () => {
          this.incomingCallIsRinging = false;
          this.activeCall = false;
        });

        this.activeCall.addListener('cancel', () => {
          this.incomingCallIsRinging = false;
          this.activeCall = false;
        });

        this.activeCall.addListener('disconnect', () => {
          this.incomingCallIsRinging = false;
          this.activeCall = false;
        });
    },
    async startupDevice() {
      // fetch a token
      const token = await this.fetchToken();
      
      // create a new Device instance and save it in the component's data property
      this.device = new Device(token, {logLevel: 1});

      // add an 'error' event listener to the Device instance
      this.device.addListener('error', (twilioError) => {
        console.log(`Twilio Device error: ${twilioError.message}`)
      })

      // add an event listener for 'incoming' event
      this.device.addListener('incoming', (call) => {
        // this event handler receives a Call instance
        this.handleIncomingCall(call)
      })
      this.device.addListener('registered', () => {
        this.deviceIsRegistered = true;
      })
      this.device.addListener('unregistered', () => {
        this.deviceIsRegistered = false;
      })

      // invoke .register() to get ready for incoming calls
      this.device.register();
    }
  },
  async mounted() {
    // invoke the startupDevice method
    this.startupDevice();
  },
  computed: {
    statusIndicatorStyles() {
      return {
        'height': '10px', 
        'width': '10px',
        'box-shadow': `0px 0px 3px ${this.deviceIsRegistered ? 'green' : 'lightgray'}`, 
        'background-color': this.deviceIsRegistered ? 'green' : 'lightgray'
      }
    }
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

.registered-status {
  height: 18px;
  margin: 5px;
  width: 150px;
  padding: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid rgb(138, 138, 138);
  border-left: 1px solid rgb(138, 138, 138);
}

.registered-status p {
  margin: 3px;
  font-size: 10px;
}

.incoming-call-info button,
.outgoing-call-controls button {
  margin: 5px;
  width: 100px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  border: 2px outset rgb(195, 195, 195);
  border-radius: 0;
  cursor: pointer;
}

.call-controls button:active {
  border: 2px inset rgb(138, 138, 138);
}
</style>