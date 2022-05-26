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

          await client.connect();
          const orderCollection = client.db('computerManufacturer').collection('orders');


         
           //  for review show 

          app.get('/reviews',async (req,res)=>{

               const query ={};
               const cursor = reviewCollection.find(query);
               const review = await cursor.toArray();
                res.send(review);
           });

// for details product 

           app.get('/parts/:id', async(req,res) =>{
               const id= req.params.id;
               console.log(id);
               const query ={_id:ObjectId(id)}
               const detailProduct =await partCollection.findOne(query);
               res.send(detailProduct)
           
           })


          // for parts show 

          app.get('/parts',async (req,res)=>{

               const query ={};
               const cursor = partCollection.find(query);
               const part = await cursor.toArray();
                res.send(part);
           });


//    post {add review}

app.post('/reviews',async(req,res)=>{
     const newUser =req.body;
     console.log("new user",newUser);
     const result =await reviewCollection.insertOne(newUser);
     res.send(result);
 })
app.post('/orders',async(req,res)=>{
     
     const query ={_id:ObjectId(id)}
     const newUser =req.body;
const {email,} =newUser
     console.log("new user",newUser);
     const result =await orderCollection.insertOne(newUser);
     const complete = await reviewCollection.updateOne
     res.send(result);
 })


           
     }



     finally{

     }
}


run().catch(console.dir);


app.listen(port,()=>{
     console.log('connecting to port',port);
})



