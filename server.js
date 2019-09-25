const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql');
var path = require("path");
app.use(bodyParser.urlencoded({ extended: false }))
function conn(){
  var connection= mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Italia3357402203',
      database: 'amazon_db',
      port: 3306
    })
    return connection;
}

function getQuery(x, callback){
  connection = conn()
    connection.connect((err, connection) => {
      if (err){x.send('problems connecting');}
      console.log('connected')
      })

      let query = 'SELECT * FROM product_list '
      connection.query(query, function(err,result){
        x.json(result)
    });
    connection.end()
  
  }

  function sell(totalSale, date, time, productName, oldStock, quantityOrdered, updatedInventory){
    var connection = conn();
    connection.connect();
    let command = `INSERT INTO da_bank_statements (transaction_amount, transaction_date, transaction_time, transaction_item, old_item_stock, transaction_quantity, updated_stock) VALUES (${totalSale}, '${date}', '${time}', '${productName}', ${oldStock}, ${quantityOrdered}, ${updatedInventory})`

    connection.query(command, (err, rows, fields) => {
      connection.query(`UPDATE product_list SET quantity=${updatedInventory} WHERE product_name='${productName}'`)
    })
   
    
    }
    

app.use(express.static(path.join(__dirname, 'public')));
app.listen('4200', () => console.log('listening on 4200'))




app.post('/purchase', (req, res) => {
  let oi = req.body
  sell(oi.price, oi.date, oi.time, oi.name, oi.stock, oi.stockPurchased, oi.newStock);
  console.log('Sold!!! ' + oi.name)
  
  
})

app.get('/all-items', (req,res)=>{
    getQuery(res)
})
