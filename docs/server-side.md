# Server-Side and Twilio Account Setup

## 1. Set up your Twilio Console

 <br/>

 Prepare your Twilio Console by pinning the following products:

  - Voice
  - Phone Numbers
  - TwiML Bins
  - Functions

<br/>

## 2. Buy a Twilio Phone Number
 
 <br/>

   - [Buy a Twilio Phone Number](https://www.twilio.com/console/phone-numbers/incoming) in the Console. 

 <br/>

 You'll use this for your outbound callerId. You can also use this as your inbound phone number.

<br/>

## 3. Set up the server side requirements

<br/>

 ### 3.1. Create a TwiML endpoint for outbound calls
   
 <br/>

  - [Create a TwiML Bin](https://www.twilio.com/console/twiml-bins) with the following TwiML:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say>Hello<Say>
    <Hangup />
  </Response>
  ```

  - Copy the URL for this endpoint.

  **Pro Tip:** Keep it simple (no &lt;Dial yet) to help isolate any issues that may arise. 

  **Note:** [The Voice JavaScript SDK Quickstarts ](https://www.twilio.com/docs/voice/sdks/javascript/get-started)show 
  examples of using your own server to provide TwiML instructions to Twilio. 

<br/>

 ### 3.2. Create a TwiML App
 
 <br/>
 
   - [Create a TwiML App ](https://www.twilio.com/console/voice/twiml/apps) in the Twilio Console and set the Voice Configuration URL to your TwiML endpoint's URL. 
 
   - Copy the SID of this TwiML App. Paste it in a note file/sticky note.

 For more detailed instructions, see the [Node.js Quickstart Repo](https://github.com/TwilioDevEd/voice-javascript-sdk-quickstart-node/blob/main/ConsoleHowTos/CreateNewTwiMLApp/CreateNewTwiMLApp.md).

</br>

 ### 3.3. Generate an API Key and Secret

 <br/>
 
   - [Generate an API Key and Secret](https://www.twilio.com/console/project/api-keys).  
 
   - Copy and paste these into your note file/sticky note. (Keep them secret!) 

 For more detailed instructions, see the[ Node.js Quickstart Repo](https://github.com/TwilioDevEd/voice-javascript-sdk-quickstart-node/blob/main/ConsoleHowTos/CreateAPIKey/CreateAPIKey.md).
 
<br/>

 ### 3.4. Create and deploy an AccessToken endpoint
 
 <br/>

    - Copy the contents of the `accessTokenEndpoint.js` file in this repo and deploy a public Twilio Function. You will need to include the **TwiML App SID**, **API Key and Secret**, and your **Twilio Account SID** in the Twilio Function's Environment Variables in order to generate AccessTokens. 
 
   - **Copy the URL for this endpoint.** 

  This example assumes that you'll pass the end user's `identity` as a query parameter when you make the request for the AccessToken. 

  For examples of creating AccessTokens in a different programming language, check out the [Quickstarts](https://www.twilio.com/docs/voice/sdks/javascript/get-started).
 
<br/>

 ### 3.5. Fetch an AccessToken
 
 <br/>

  Before you can use the Voice JavaScript SDK, you'll need to fetch an AccessToken from your server-side endpoint. A good time to do this is when you'd make other API calls (i.e. once your "Phone" component has been mounted on the DOM). 

    **Pro Tip:** Before trying to use the SDK, debug your AccessToken on [jwt.io](https://jwt.io/) and verify that it contains all of the necessary information. [See the Access Tokens page for more information.](https://www.twilio.com/docs/iam/access-tokens#create-an-access-token-for-voice)

    **Note on Regional:** If you're trying to use the JS SDK in a non-US region, read the [Build a web app using the JavaScript Voice SDK page ](https://www.twilio.com/docs/global-infrastructure/use-the-programmable-voice-javascript-sdk-with-a-non-us-twilio-region)first! 
 
<br/>

## 4. Install, import, instantiate the JS SDK

<br/>

 ### 4.1. Install the JavaScript SDK
 
 <br/>

   - Run the following command in your terminal in the root of your project.
   
   ```bash
   npm install @twilio/voice-sdk –save
   ```
 

<br/>

 ### 4.2. Import the Device class
 
 <br/>

   - Import the Device class into your JavaScript project:
 
   ```js
   import { Device } from '@twilio/voice-sdk';
   ```

<br/>

 ### 4.3. Instantiate the Device
 
 <br/>

   - Create a new Device instance with your AccessToken. Add an 'error' event listener. 
 
   ```js
   const device = new Device(accessToken);
   device.addListener('error', (twilioError) = {
     console.log(`Twilio Device error: ${twilioError.message}`);
   })
   ```

 **Note:** Do not create more than one Device instance. Keep track of this one in a variable or in the component's state or your state management tool. 
 
<br/>

## 5. Move on to the ["Make Outgoing Calls" guide](./outgoing-calls.md)
