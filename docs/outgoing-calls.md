# Make outgoing calls with the Voice JavaScript SDK

## 1. Add UI elements for outgoing calls

 <br/>

 At a minimum, I suggest you create the following UI elements:

   - A **Call** &lt;button>

   - A **Hangup** &lt;button>
   
   - Some indicator that a call is in progress
 

<br/>

## 2. Add code for handling outgoing calls

 <br/>
 
   - Create a new `placeOutgoingCall` method
 
   - Add a click listener to your **Call** &lt;button that invokes the `placeOutgoingCall` method
 
   - Within the `placeOutgoingCall` method, invoke `device.connect()` and save the returned Call instance so that you can invoke methods on it later.  **Note: `device.connect()` returns a Promise that resolves with a Call instance.**
 
   - Add 'disconnect' event listeners to the Call instance
 
   - Within the 'disconnect' event handler, include logic that will reset the UI when a call ends
 
   - Update the UI to show that there is a call in progress
 
   - Create a `hangup` method containing `call.disconnect()`. **Note: Make sure the method has access to the Call instance that was returned by the `device.connect()` method.** 

   - Add a click listener to your **Hang Up** &lt;button that invokes your `hangup` method.

 
 Invoking `device.connect()` will cause Twilio to request TwiML instructions from the TwiML endpoint that is specified in the TwiML App associated with the end user's AccessToken. (In other words, Twilio will look to the AccessToken's `outgoingApplicationSid` property to find the TwiML App's SID, then will look to that TwiML App's Voice Configuration URL. This URL is your TwiML endpoint.)
 
 This connection between Twilio and the SDK end users is the first "leg" (or the "parent" Call) of an outgoing SDK call. If the TwiML contains a &lt;Dial verb, Twilio will create a second "leg" (or a "child" call) that connects the SDK end user to the intended recipient. This is why you generally see two Call Logs for each SDK call in the Twilio Console. 

 **Relevant documentation:** 
 * [device.connect()](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#deviceconnectconnectoptions)
 * [Call 'disconnect' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#disconnect-event)
 * [call.disconnect()](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#calldisconnect)
 

<br/>

## 3. Test outgoing calls
 
 <br/>

   - Try making a call from your website
 
   - Check your Call Logs in the Twilio Console
   
   Notice that a Call Log with an "INCOMING" direction from `client:[your name here]` with an empty "To" field. This is the initial leg between your end user and Twilio. (It's 'incoming' to Twilio from your SDK end user)

<br/>

## 4. Iterate and explore
 
 <br/>

   - Change your TwiML endpoint to &lt;Dial>&lt;Number>
 
   - Open your browser's dev tools console
 
   - Make a call from your website (Without a callerId, the second leg of the call will fail)
 
   - Look at your browser console and notice what the error looks like
 
   - Look at the Console's Call Logs and Error Logs to see what this looks like
 
   - Change your TwiML endpoint to &lt;Dial with a callerId
 
   - Make a call from your website

   - Look at the Call Logs
 
 Additionally, you could try removing the TwiML App's Voice Configuration URL and investigating what error that throws in the browser console, in your Twilio Console's Error Logs, and in your Call Logs. 


<br/>

## 5. Move on to [Handle Incoming Calls](./incoming-calls.md)