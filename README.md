# Voice API certification project

This repo contains the code for Voice API certification project.

## Running the application 

First clone the repo and install dependencies

```
git clone https://github.com/nuxero/voice-certification.git
cd voice-certification
npm install
```

Then copy `example.env` to `.env`. Set YOUR_NUMBER to a phone number you own and VIRTUAL_NUMBER to a valid Vonage virtual number.

Run the app

```
npm start
```

RUn ngrok on port 3000

```
ngrok http 3000
```

## Configuring Vonage

Login into your [dashboard](https://dashboard.nexmo.com) and create a new application.

Select Voice and add the following webhooks:

* Events: https://ngrok-generated-url/webhooks/events
* Answer: https://ngrok-generated-url/webhooks/answer

Save the application and link a virtual number with it.

## Testing the application

Make a call from any phone number other than the one you set as "YOUR_NUMBER" (you probably don't wanna call yourself don't you) to the VIRTUAL_NUMBER linked to the application.

* Press 1 to hear a cool song
* Press 2 to hear the current date and time
* Press 3 to call YOUR_NUMBER
* DON'T PRESS ANY OTHER OPTION, or you'll regret it!!!!