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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
