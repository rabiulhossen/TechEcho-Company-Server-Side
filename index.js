const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Running Parts Manufacturer');
    console.log('port is', port);
});




const uri = "mongodb+srv://${process.env.MANUFACTURER_USER}:${process.env.MANUFACTURER_PASS}@cluster0.chnht.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


async function run (){


     try{

     }



     finally{

     }
}


run().catch(console.dir);
app.listen(port,()=>{
     console.log('connecting to port',port);
})
