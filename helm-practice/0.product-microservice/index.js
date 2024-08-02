
const express = require('express')
const fs = require('fs').promises;
const yaml = require('yaml');
const app = express()
const port = 3000



async function fetchProductsYaml() {
  let result = []
  try {
    const data = await fs.readFile(process.env.PRODUCT_YAML_PATH, 'utf8');
    result = yaml.parse(data);
  } catch (err) {
    console.error('Error reading the YAML file:', err);
  }
  return result
}

const mysql = require('mysql2/promise');
async function fetchProductsDb() {
  console.log("process.env.MYSQL_HOST", process.env.MYSQL_HOST);
  console.log("process.env.MYSQL_USER", process.env.MYSQL_USER);
  console.log("process.env.MYSQL_ROOT_PASSWORD", process.env.MYSQL_ROOT_PASSWORD);
  console.log("process.env.MYSQL_DATABASE", process.env.MYSQL_DATABASE);

  let connection;
  try {
    // Create a connection to the database
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    // Perform a query
    const [rows] = await connection.execute('SELECT * FROM products');
    console.log(rows);

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // Ensure the connection is closed
    if (connection) {
      await connection.end();
    }
  }
}

// const mysql = require('mysql');
// const util = require('util');

// async function fetchProductsDb() {
//   console.log("process.env.MYSQL_HOST", process.env.MYSQL_HOST)
//   console.log("process.env.MYSQL_USER", process.env.MYSQL_USER)
//   console.log("process.env.MYSQL_ROOT_PASSWORD", process.env.MYSQL_ROOT_PASSWORD)
//   console.log("process.env.MYSQL_DATABASE", process.env.MYSQL_DATABASE)
//   const conn = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE
//   });

//   const query = util.promisify(conn.query).bind(conn);

//   let result = []
//   try {
//     conn.connect();
//     result = await query("SELECT * FROM products");
//     console.log(result);
//     conn.end();
//   } catch (err) {
//     console.error(err);
//   }
//   return result
// }


app.get('/products-yml', async (req, res) => {
  const products = await fetchProductsYaml()
  res.send(products)
})
app.get('/products-db', async (req, res) => {
  const products = await fetchProductsDb()
  res.send(products)
})
app.get('/', async (req, res) => {
  res.send({})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

