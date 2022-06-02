const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.chnht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Running Parts Manufacturer");
  console.log("port is", port);
});

async function run() {
  try {
    await client.connect();
    const reviewCollection = client
      .db("computerManufacturer")
      .collection("reviews");

    const partCollection = client
      .db("computerManufacturer")
      .collection("parts");

    const orderCollection = client
      .db("computerManufacturer")
      .collection("orders");

    const userCollection = client
      .db("computerManufacturer")
      .collection("users");

    //  for review show

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    app.get("/reviews", async (req, res) => {
      const email = req.query.email;

      const query = { email: email };
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    // for details product

    app.get("/parts/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const detailProduct = await partCollection.findOne(query);
      res.send(detailProduct);
    });
    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const orderProduct = await orderCollection.findOne(query);
      res.send(orderProduct);
    });

    // for parts show

    app.get("/parts", async (req, res) => {
      const query = {};
      const cursor = partCollection.find(query);
      const part = await cursor.toArray();
      res.send(part);
    });

    //    post {add review}

    app.post("/reviews", async (req, res) => {
      const newUser = req.body;
      console.log("new user", newUser);
      const result = await reviewCollection.insertOne(newUser);
      res.send(result);
    });
    // app.post("/orders", async (req, res) => {
    //   const query = { _id: ObjectId(id) };
    //   const newUser = req.body.email;
    //   const result = await orderCollection.insertOne(newUser);
    //   const complete = await reviewCollection.updateOne;
    //   res.send(result);
    // });
    // app.get("/orders", async (req, res) => {
    //   const query = { _id: ObjectId(id) };
    //   const newUser = req.body;
    //   const { email } = newUser;
    //   console.log("new user", newUser);
    //   const result = await orderCollection.findOne(newUser);

    //   res.send(result);
    // });

    app.get("/user", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.put("/user/:email", async (req, res) => {
      const user = req.body;
      const email = req.params.email;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const output = await userCollection.updateOne(filter, updateDoc, options);
      res.send(output);
    });

    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === "admin";
      res.send({ admin: isAdmin });
    });

    // app.put('/user/admin/:email', async (req, res) => {
    //   const email = req.params.email;
    //   const requester = req.email;
    //   const requesterAccount = await userCollection.findOne({ email: requester });
    //   if (requesterAccount.role === 'admin') {
    //     const filter = { email: email };
    //     const updateDoc = {
    //       $set: { role: 'admin' },
    //     };
    //     const result = await userCollection.updateOne(filter, updateDoc);
    //     res.send(result);
    //   }
    //   else{
    //     res.status(403).send({message: 'forbidden'});
    //   }

    // })

    app.put("/user/admin/:email", async (req, res) => {
      const email = req.params.email;
      const filter = await userCollection.findOne({ email: email });
      console.log(filter);
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Delete
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query ={_id:ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const email = req.body.email;
      const query = { email: email };
      console.log("new user", email);
      const result = await orderCollection.find(query).toArray;

      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("connecting to port", port);
});
