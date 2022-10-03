// This is an example Twilio Function that mints AccessTokens for your Voice JavaScript SDK end users

// First, create an API_KEY and API_SECRET in your Twilio Console. Keep them in a safe place, you won't be able to see the SECRET again! You'll need both to set up this Function.

// Copy and paste this into a Twilio Functions Service
// Set the environmental variables
//   - Check the option to include your ACCOUNT_SID and AUTH_TOKEN
//   - API_KEY and API_SECRET: Get these in your Twilio Console.
//   - OUTGOING_SID: Create a TwiML App in the Twilio Console and use the SID for this environmental variable
// Make the endpoint public
// Don't forget to save and deploy!

// Click "Copy URL" to get the URL for the Function ... you'll use this URL in your client-side code to fetch the AccessTokens

// This function expects an `identity` query parameter. You add ?identity=someName to the end of your URL to create an AccessToken with that identity.

// THIS IS NOT SECURE AND SHOULD BE MADE SECURE BEFORE USING IN PRODUCTION. Check out the Twilio Functions documentation for ideas on how to secure your Twilio Function.

exports.handler = function (context, event, callback) {
  const twilioAccountSid = context.ACCOUNT_SID;
  const twilioApiKey = context.API_KEY;
  const twilioApiSecret = context.API_SECRET;
  const userIdentityFromRequest = event.identity;

  const AccessToken = Twilio.jwt.AccessToken;

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: userIdentityFromRequest }
  );

  const VoiceGrant = AccessToken.VoiceGrant;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: context.OUTGOING_SID,
    incomingAllow: true
  });

  token.addGrant(voiceGrant);

  const response = new Twilio.Response();
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:8080", // change this to your client-side URL
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  response.setHeaders(headers);
  response.setBody({
    token: token.toJwt(),
  });

  return callback(null, response);
};
