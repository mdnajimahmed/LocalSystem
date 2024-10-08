const express = require('express');
const app = express();


// Middleware to capture request headers and add them to response headers
app.use((req, res, next) => {
  console.log("updating response headers")
  // Loop through each request header
  Object.keys(req.headers).forEach(headerName => {
    // Add the request header to the response with prefix 'x-req-header-'
    res.setHeader(`x-req-header-${headerName}`, req.headers[headerName]);
  });
  // Continue to the next middleware or route handler
  next();
});


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


// fails with 33% probability with fixed 1000ms response time
app.get('/api/unstable', async (req, res) => {
  const sleepTime = 1000;
  await new Promise(resolve => setTimeout(resolve, sleepTime));
  if(Math.floor(Math.random()*3) == 2){
    res.status(200).send(`I am healthy :) `);
  }else{
    res.status(500).send(`I am not feeling well :( `);
  }
});


app.get(['/api/pascal-triangle'], (req, res) => {
  res.status(200).send(`version = ${appVersion}. 
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
    `);
});

app.get(['/health', '/ready', '/live'], (req, res) => {
  res.status(200).send(`OK from version = ${appVersion}`);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
