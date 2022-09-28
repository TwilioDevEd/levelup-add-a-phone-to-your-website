

# Handle incoming calls with the Voice JavaScript SDK

This section assumes you've already set up an AccessToken endpoint, and have set up outgoing calls functionality and the associated UI elements. 

Incoming calls with the SDK work differently from outgoing calls. The main differences are: 



* Calls are directed to your website's JS SDK end user by using the &lt;Client> noun inside &lt;Dial>. 
* The AccessToken must have `incomingAllow:true` within the VoiceGrant
* Your UI should now contain elements to handle incoming calls.
* Your Device instance should have event listeners for the 'incoming' and 'registered' events.
* The TwiML instructions for incoming calls do not need to go through the TwiML App that is specified in the AccessToken
* The Device instance must be 'registered' with Twilio in order to receive calls. This is achieved by invoking the .register() method on the Device instance.


### **Dial an SDK end user with &lt;Dial> and &lt;Client> TwiML**

Relevant documentation: 


* [&lt;Dial>](https://www.twilio.com/docs/voice/twiml/dial)
* [&lt;Client>](https://www.twilio.com/docs/voice/twiml/client)
1. Set up a new TwiML endpoint for handling incoming calls. (TwiML Bins are the fastest way to test this out!)

* Use the &lt;Dial> verb with &lt;Client> nested inside &lt;Dial>'s opening and closing tags. 
* Within the &lt;Client> noun's opening and closing tags, place the `identity` of your end user's AccessToken
2. Configure a Twilio Phone Number to use this TwiML endpoint to handle incoming calls
    * In the Twilio Console, on the Phone Number's configuration page, scroll down to **Voice & Fax > Configure With. Select TwiML Bin, and choose the new TwiML Bin you created.**

**Note:** This can be the same Phone Number you use for outgoing calls, or it could be a different Twilio Phone Number. 


### **Modify AccessTokens to allow incoming calls**

Relevant documentation: 



* [AccessTokens](https://www.twilio.com/docs/iam/access-tokens#create-an-access-token-for-voice)

Modify your AccessToken endpoint so that AccessTokens now include the `incomingAllow: true` in the VoiceGrant. 


### **Add UI elements for incoming call handling**

Add the following pieces to your UI:



* A message that states the device is ready to receive incoming calls.
* A message that states that a call is incoming
* An **Accept** &lt;button>
* A **Reject** &lt;button>


### **Add event listeners to your Device instance**

Relevant documentation:



* [Device registered event](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#registered-event)
* [Device incoming event](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#incoming-event)

Immediately after instantiating your Device, add two separate event listeners: 

```js

device.addListener('registered', () => {})

device.addListener('incoming', (call)=> {})

```


### **Register the Device instance with Twilio**

Relevant documentation: 



* [device.register()](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#deviceregister)
* [Device 'registered' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#registered-event)

In order to receive incoming calls, your Device instance must be 'registered' with Twilio. 



1. Invoke the `device.register()` method on your Device instance after you've added the 'registered' and 'incoming' event listeners.  
2. Once the Device instance is registered with Twilio, the Device instance will emit the 'registered' event. 
3. Inside your 'registered' event handler, add logic that updates the UI so the user knows they can now accept incoming calls. 


### **Handle incoming calls**

Relevant documentation: 



* [Device 'incoming' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#incoming-event)
* [Call 'accept' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#accept-event)
* [Call 'reject' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#reject-event)
* [Call 'disconnect' event](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#disconnect-event)
* [call.reject()](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callreject)
* [call.accept()](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callacceptacceptoptions)
* [call.disconnect()](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#calldisconnect)

Upon receiving an incoming call, your Device instance emits the 'incoming' event. The 'incoming' event passes a Call instance to the 'incoming' event handler. 



1. Add code for handling incoming calls

    Within the Device instance's 'incoming' event handler:

* Take the Call instance that was passed to the incoming event handler and add the following event listeners:
    * 'accept' event 
    * 'reject' event
        * **Pro Tip**: Call instances do NOT emit 'reject' events when the other party rejects a call. This event is emitted when your local end user rejects an incoming call (as opposed to answering the call).
    * 'disconnect' event 
* Add logic that updates the UI that shows the end user that they're receiving an incoming call. 
* Save the Call instance in a variable or the component's state, since you will need to invoke methods such as .accept() or .reject() on that Call instance. 
2. Allow users to accept a call
* Create an `acceptIncomingCall` method that invokes the `call.accept()` method on the Call instance. 
* Add a click listener to the **Accept** &lt;button> that invokes this `acceptIncomingCall` method.
* You already added an 'accept' listener to this Call instance (within the 'incoming' event handler). The 'accept' event handler should update the UI appropriately for the end user to let them know a call is in progress:
    * Hide the 'incoming call from …' message
    * Hide the **Accept** and **Reject** &lt;button>s
    * Show a **Hangup** &lt;button> (or enable it)
3. Allow users to reject a call
* Create a `rejectIncomingCall` method that invokes the `call.reject()` method on the Call instance.
* Add a click listener to the **Reject** &lt;button> that invokes the 'rejectIncomingCall' method.
* You already added a 'reject' listener to this Call instance (within the 'incoming' event handler). The 'reject' event handler should update the UI appropriately for the end user to indicate that the incoming call has been rejected and no call is in progress.


## Incoming call FAQs


### **How does my SDK end user dial a phone number?**

Relevant documentation



* [Device ConnectOptions](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#connectoptions)
* The [Voice JavaScript SDK Quickstarts](https://www.twilio.com/docs/voice/sdks/javascript/get-started) also contain examples of this behavior.

In order for an end user to dial a specific number, you will need to pass the information from the client side (i.e. the phone number) to your TwiML endpoint on the server side. You do this by passing an argument containing the information to the device.connect() method. 

`device.connect()` accepts one argument, a "ConnectOptions" object, which can contain a `params` property. The `params` value must be an object containing key/value pairs of your custom information. 

**Example: **


    An end-user inputs "+15558889999" in a form on the front end. 


    Set this phone number in your ConnectOptions object's `params` property. 


    // Your JavaScript file


    const connectOptions = {


      params: { 


        numberToDial: "+15558889999"


      }


    }


    let call = await device.connect(connectOptions);


    Your TwiML endpoint that handles outgoing calls can access this custom `numberToDial` parameter within Twilio's request body. You can then use the `numberToDial` value when creating the TwiML that you send back to Twilio. 


### **Can a call be sent to more than one SDK end user?**

If you have multiple SDK end users that you want to answer a call, you can use &lt;Dial> and &lt;Client>. All of the end users' Device instances will "ring" until one of the end users accepts the call. 

The &lt;Dial> verb can have up to ten &lt;Client> nouns. 

For example: 

Lisa, Max, and Jameel are all end-users whose Device instances are registered with Twilio. 

Your Twilio account has a Twilio Phone Number that uses the following TwiML document for incoming calls: 

```xml


    &lt;Dial> 


      &lt;Client>Lisa&lt;/Client>


      &lt;Client>Max&lt;/Client>


      &lt;Client>Jameel&lt;/Client>


    &lt;/Dial>

```

When Twilio executes this TwiML document, Lisa, Max, and Jameel's Device instances will all emit the 'incoming' event for this call. 

If Max's Device instance invokes `call.accept()` before Lisa or Jameel accept the call, Lisa's and Jameel's Call instances will emit the 'cancel' event. 