const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Running Parts Manufacturer');
    console.log('port is', port);
});


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.chnht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run (){


     try{

          await client.connect();
          const reviewCollection = client.db('computerManufacturer').collection('reviews');

          await client.connect();
          const partCollection = client.db('computerManufacturer').collection('parts');


          // for parts show 

          app.get('/reviews',async (req,res)=>{

               const query ={};
               const cursor = reviewCollection.find(query);
               const review = await cursor.toArray();
                res.send(review);
           });

          //  for review show 

          app.get('/parts',async (req,res)=>{

               const query ={};
               const cursor = partCollection.find(query);
               const part = await cursor.toArray();
                res.send(part);
           });

     }



     finally{

     }
}


run().catch(console.dir);


app.listen(port,()=>{
     console.log('connecting to port',port);
})




