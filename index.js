const express = require("express");
const app = express();
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const pool = require("./sql/connection");

const PORT = 8888;

app.use(cors());
// middleware to read body text from REST API
app.use(express.json())

const vinyl = [
  {id: "1", title: 'Purple Rain', artist: 'Prince and the Revolution'},
  {id: "2", title: 'Live at Folsom', artist: 'Johnny Cash'},
  {id: "3", title: 'Midnight Marauders', artist: 'A Tribe Called Quest'},
  {id: "4", title: 'The Record', artist: 'FEAR'},
];

const users = [
  {id: "1", email: 'mmhuntsberry@test.com', password: 'password'},
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the jungle!"
  });
});

// read
app.get("/vinyl", (req, res) => {
  pool.query('SELECT * FROM ??', ['vinyl'], (err, rows, fields) => {
    res.json(rows)
  }); 
});

// read one
app.get("/vinyl/:id", (req, res) => {
  const query = 'SELECT * FROM ?? WHERE id = ?';
  const params = ['vinyl', id];
  const { id } = req.params;

  pool.query(query, params, (err, rows, fields) => {
    res.json(rows)
  }); 

  // res.json(foundItem);
});

// CREATE
app.post('/vinyl', (req, res) => {
  const newRecord = {
    ...req.body,
    id: uuidv4(),
  }

  vinyl.push(newRecord);

  res.json({
    vinyl
  });
});


app.put('/vinyl/:id', (req, res) => {
  const {id} = req.params
  const foundItem = vinyl.find((record) => {
    return record.id === id
  });
  const foundIndex = vinyl.findIndex((record) => {
    return record.id === id
  });
  

  console.log(foundItem)
  
  const updatedRecord = {
    ...foundItem,
    ...req.body,
  }


  vinyl.splice(foundIndex, 1, updatedRecord);

  res.json({
    vinyl
  });
});

app.delete('/vinyl/:id', (req, res) => {
  const {id} = req.params
  const foundIndex = vinyl.findIndex((record) => {
    return record.id === id
  });

  vinyl.splice(foundIndex, 1);

  res.json({
    vinyl
  });
});

// ? BELOW HERE ARE USER RESOURCES

// read
app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

// read one
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const foundItem = users.find((record) => {
    return record.id === Number(id)
  });

  res.json(foundItem);
});

// CREATE
app.post('/users', (req, res) => {
  const newRecord = {
    ...req.body,
    id: uuidv4(),
  }

  users.push(newRecord);

  res.json({
    users
  });
});


app.put('/users/:id', (req, res) => {
  const {id} = req.params
  const foundItem = users.find((record) => {
    return record.id === id
  });
  const foundIndex = users.findIndex((record) => {
    return record.id === id
  });
  

  console.log(foundItem)
  
  const updatedRecord = {
    ...foundItem,
    ...req.body,
  }


  users.splice(foundIndex, 1, updatedRecord);

  res.json({
    users
  });
});

app.delete('/users/:id', (req, res) => {
  const {id} = req.params
  const foundIndex = users.findIndex((record) => {
    return record.id === id
  });

  users.splice(foundIndex, 1);

  res.json({
    users
  });
});



app.listen(PORT, () => console.log(`The server is listening on PORT ${PORT}`))