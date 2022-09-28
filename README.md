# Twilio LevelUp - Add a phone to your website

## About this repo

This repository is a sample Vue application meant to accompany a Twilio LevelUp webinar on the Twilio Voice JavaScript SDK. 

This repo contains guides and resources in the `/docs/` directory that will help you add VoIP functionality to an existing website:

* [Server-Side and Twilio Account Setup](./docs/server-side.md)
* [Make outgoing calls with the Voice JavaScript SDK](./docs/outgoing-calls.md)
* [Handle incoming calls with the Voice JavaScript SDK](./docs/incoming-calls.md)
* [Resources, Tips, and Troubleshooting](./docs/resources.md)

The `outgoing-calls` branch shows a working front end example for outgoing call functionality.

The `incoming-calls` branch shows a working front end example for incoming call functionality. 

This project requires some server-side setup, which is outlined in the Server-Side and Twilio Account Setup doc. 

To use this project, clone the repository and install the dependencies by running the following terminal commands: 

```bash
git clone    
```
```bash
cd levelup-add-a-phone
```
```bash
npm install
```

All Voice JavaScript SDK functionality is contained within the `/src/components/Phone.vue` file.