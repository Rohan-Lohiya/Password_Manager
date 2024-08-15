const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors') 


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passwordManagerr';

console.log(process.env)
const app = express()
const port  = 3000
app.use(bodyParser.json())
app.use(cors())
client.connect();


app.get('/', async (req, res) =>{
  const db = client.db(dbName);
  
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})
app.post('/', async (req, res) =>{
    const passwords = req.body;
    const db = client.db(dbName);
    
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(passwords);
    res.send({success: true, result: findResult});
})
app.delete('/', async (req, res) =>{
    const passwords = req.body;
    const db = client.db(dbName); 
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(passwords);
    res.send({success: true, result: findResult});
})
app.put('/', async (req, res) => {
    const { id, ...updatedPassword } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.updateOne(
      { id },
      { $set: updatedPassword }
    );
    res.send({ success: true, result: findResult });
  });
app.listen(port, () =>{
    console.log(`App listening in port http://localhost:${port}`)
})