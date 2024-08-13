const express = require('express');
const app = express();
const port = 3000;

const UNKNOWN = 'unknown'

// Application version
const appVersion = process.env.PAYMENT_APP_VERSION || UNKNOWN;

const colorSchemes = {
  "1.0.0": {
    background: '#f0f8ff',
    containerBg: '#e6f2ff',
    textColor: '#005f99',
    buttonBg: '#007acc',
    buttonHoverBg: '#005f99',
    borderColor: '#005f99'
  },
  "1.0.1": {
    background: '#f0fff0',
    containerBg: '#e6ffe6',
    textColor: '#005f00',
    buttonBg: '#00cc00',
    buttonHoverBg: '#009900',
    borderColor: '#005f00'
  },
  [UNKNOWN]:{
    background: '#ffffff',         
    containerBg: '#f8f8f8',       
    textColor: '#333333',          
    buttonBg: '#dddddd',           
    buttonHoverBg: '#cccccc',     
    borderColor: '#cccccc'        
  }
}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route for the payment page
app.get('/', (req, res) => {
  console.log("appVersion",appVersion)
  const colorScheme = colorSchemes[appVersion];
  res.render('payment', { colorScheme, appVersion });
});

app.get('/api/version', (req, res) => {
  console.log("appVersion",appVersion)
  res.send({appVersion});
});


app.get('/api/version', (req, res) => {
  console.log("appVersion",appVersion)
  res.send({appVersion});
});

// this api remains down when current time's minute is divisible by 5.
// e.g this api is be down at 10.15, 11.30 etc
app.get('/api/message', (req, res) => {
  const currentTime = new Date();
  const currentTimeStr = currentTime.toISOString().slice(11, 19);
  const currentMinute = currentTime.getMinutes();
  const reminder = currentMinute % 5;
  const serverName = process.env.PAYMENT_APP_VERSION === "1.0.0" ? "primary" : "secondary"
  let message = `${serverName} : Hello from ${serverName}, ${currentTimeStr} -> ${currentMinute} -> ${reminder}`;
  console.log("message",message)

  if( serverName === "primary" && reminder===0){
    res.status(500).send({message})
  }else{
    res.status(200).send({message});
  }
});

// randomsly sleeps 500 ms to 2000ms (.5 sec to 2 sec)
app.get('/api/sleep', async (req, res) => {
  const sleepTime = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
  await new Promise(resolve => setTimeout(resolve, sleepTime));
  res.send(`Slept for ${sleepTime} milliseconds`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
