
const express = require('express')
const fs = require('fs').promises;
const yaml = require('yaml');
const app = express()
const port = 3000




async function readYamlFile() {
  try {
    // Read the YAML file
    const data = await fs.readFile(process.env.PRODUCT_YAML_PATH, 'utf8');

    // Parse the YAML content
    const products = yaml.parse(data);

    // Output the parsed content
    // console.log(JSON.stringify(products, null, 2));
    return products
  } catch (err) {
    console.error('Error reading the YAML file:', err);
  }
}


app.get('/products', async (req, res) => {
const products = await readYamlFile()
  res.send(products)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})