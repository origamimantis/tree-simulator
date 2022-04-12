const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');

const db = new Client(
  {
    connectionString: process.env.DATABASE_URL,
  ssl:
    {
      rejectUnauthorized: false
    }
  }
);
db.connect().then(console.log("connected to db")).catch(e=>console.log("error connecting to db",e.stack))

const app = express();
let port = process.env.PORT || 2342;

console.log("port:",port)


app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use(bodyParser.json());


app.get("/test",  (req, res) => {
	res.send({message:"welost"});
});

app.post("/api/login", (req, res) => {
  let params = req.body

  db.query(`SELECT username,pwd FROM userData WHERE username='${params.username}';`,
    (err,out)=>
    {
      if (err) throw err;
      let notexist = (out.rows.length == 0);
      // user does not exist
      if (notexist)
      {
	res.send({token:null});
      }
      else
      {
	let storedpwd = out.rows[0].pwd

	// user exists but password incorrect
	if (params.password != storedpwd)
	  res.send({token:null});

	// user exists and correct password
	else
	  res.send({token:"weLAWST"});
      }
    });
});
app.post("/api/register", (req, res) => {
  let params = req.body

  db.query(`SELECT username FROM userData WHERE username='${params.username}';`,
    (err,out)=>
    {
      if (err) throw err;
      let exists = (out.rows.length > 0);
      if (exists)
      {
	res.send({result: "EXISTS"})
      }
      else
      {
	db.query(`INSERT INTO userData( username, pwd, email, created_on, last_login )
			       VALUES ( '${params.username}', '${params.password}','a@a.a', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP );`,
	  (err2,out2)=>
	  {
	    if (err2) throw err2;
	    res.send({result: "OK"})
	  }
	);
      }
    })
});

app.post("/api/search", (req, res) => {
  let params = req.body
  db.query(`
    SELECT username, LEVENSHTEIN(username, '${params.searchText}') as "sim"
    FROM userData
    ORDER BY sim ASC
    LIMIT 5;`
    ,
    (err,out)=>
    {
      if (err) throw err;
      res.send({result: out.rows})
    })
});

app.post("/api/getuser", (req, res) => {
  let params = req.body
  db.query(`SELECT * FROM userData WHERE username='${params.username}';`,
    (err,out)=>
    {
      if (err) throw err;
      if (out.rows.length == 0)
	res.send({result: null})
      else
	res.send({result: out.rows[0]})
    })
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', "index.html"));
});


app.listen(port, ()=>{console.log("bubba")})
