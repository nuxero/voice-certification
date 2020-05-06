require('dotenv').config()
const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      bargeIn: true,
      text:
        "Welcome to a cool menu. Press 1 to hear a cool song, press 2 to hear the time, or press 3 to talk with a cool person",
    },
    {
      action: "input",
      maxDigits: 1,
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/dtmf`],
    },
  ];

  res.json(ncco);
});

app.post("/webhooks/events", (req, res) => {
  console.log(req.body);
  res.send(200);
});

app.post("/webhooks/dtmf", (req, res) => {
  let ncco = new Array();
  console.log('pressed', req.body.dtmf);
  switch (req.body.dtmf) {
    case "1":
      ncco.push({
        action: "stream",
        streamUrl: [
          "https://notes-app-uploads-hectorzelaya-dev.s3.amazonaws.com/Feliz.mp3",
        ],
      });
      break;
    case "2":
      const date = new Date();
      ncco.push({
        action: "talk",
        text: `<speak> 
        Today is 
        <say-as interpret-as="date" format="mdy">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</say-as>. 
        It is ${date.getHours()} with ${date.getMinutes()} minutes</speak>`,
      });
      break;
    case "3":
      ncco.push({
        action: "talk",
        text:
          "we are now connecting you to an agent who will be able to help you",
      });
      ncco.push({
        action: "connect",
        eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/events`],
        timeout: "45",
        from: process.env.VIRTUAL_NUMBER,
        endpoint: [
          {
            type: "phone",
            number: process.env.YOUR_NUMBER,
            dtmfAnswer: "2p02p"
          }
        ]
      });
      break;
    default:
      ncco.push({
        action: "talk",
        text: "You're not cool. Goodbye",
      });
      break;
  }

  res.json(ncco);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
