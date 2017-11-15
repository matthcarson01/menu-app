const express = require('express'),
     {json} = require('body-parser'),
     cors = require('cors'),
     massive = require('massive');

const {connectionString} = require("../keys/db_config");
const port = 3000;

const app = express();
app.use(json());
app.use(cors());

massive(connectionString)
  .then(dbInstance => app.set('db', dbInstance))
  .catch(console.log);

//Test End Point
app.get("/api/test",(req,res,next)=>{
  const dbInstance = req.app.get('db');
  dbInstance.read_test()
            .then(people => res.status(200).send(people))
            .catch(() => res.status(500).send());
  }
);
//



app.listen(port, () => {
  console.log(`Serving on Port ${port}`);
});

