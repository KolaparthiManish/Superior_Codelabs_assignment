const express = require('express');
const app = express();
const mysql = require('mysql');
const cors=require('cors');

app.use(cors())


app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ msg: "Hello World" })
})

// Configure MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Manish123$',
    database: 'usersdb',
  });
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL database');
  });
app.post('/register', (req, res) => {
    const { lastName, firstName,email, userPassword } = req.body;
    console.log(req.body);
    console.log(typeof(lastName))

    if(req.body.email == "" || req.body.firstName=== "" || req.body.lastName=== "" || req.body.userPassword=== "") {
        return res.status(422).json({ error:"please fill all fields"})
    }

    const sql = 'INSERT INTO usersdb.users (lastName, firstName, email, userPassword) VALUES (?, ?, ?, ?)';
    const values = [lastName, firstName,email, userPassword];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({msg:'Error while registering user'});
        } else {
            res.status(200).json({msg:'User registered successfully'});
        }
    });
});

app.listen(4000, () => {
    console.log('server running on http://localhost:4000');
})