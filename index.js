const express = require("express");
const cors = require('cors');

const port= process.env.PORT || 5000
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpylzkg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run(){
  try{
        const data=client.db('Vendor').collection('vd');
   
    app.get('/details',async(req,res)=>{
      const query={};
      const cursor=data.find(query);
      const product= await cursor.toArray();
      res.send(product);
      console.log(product);
    });
    app.post('/add',async(req,res)=>{
      const item=req.body;
      const result= await data.insertOne(item);
      res.send(result);
    });
    app.get('/readvendor',async(req,res)=>{
        const id=req.params.style;
        const query={};
        const item=data.find(query);
        res.send(item);
        console.log(item);
      });
    app.put('/infodataUpdate',async(req,res)=>{
      const item=req.body;
      const updateDocument = {
        $set: item
     };
      const result= await data.updateOne({style:item.style},updateDocument);
      res.send(result);
    });
    app.get('/details/:style',async(req,res)=>{
      const id=req.params.style;
      const query={style:id};
      const item=await data.findOne(query);
      res.send(item);
      console.log(item);
    });
    
    
  }
  finally{

  }
}
run().catch(console.log);

app.get('/',async(req,res)=>{
  res.send('vendor server is running');
})

app.listen(port,()=> console.log('portal running'));